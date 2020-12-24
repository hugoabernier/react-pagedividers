import * as React from 'react';
import { ISVG } from './ISVG';
import { computeControlPoints  } from './bezier-spline';
import * as Color from 'color';

// Inspired by https://github.com/anup-a/svgwave/tree/main/src/wave

const svgns = 'http://www.w3.org/2000/svg';

export interface ICustomWaveProps {
  width: number;
  height: number;
  segmentCount: number;
  layerCount: number;
  variance: any;
  fillColor: string;
  bgColor: string;
  strokeColor: string;
  strokeWidth: number;
  gradient: boolean;
  uniqueId: string;
}

interface ICustomWaveState {
  points: any[];
}

interface IPoint {
  x: number;
  y: number;
}

const OPACITY_ARR = ['22', '44', '66', '88', 'ff'];
//const OPACITY_ARR = ['ff', '88', '66', '44'];

const MAX_WAVES = 4;

export class CustomWave extends React.Component<ICustomWaveProps, ICustomWaveState> {

  /**
   *
   */
  constructor(props: ICustomWaveProps) {
    super(props);
    console.log("Wavery constructor");
    this.state = {
      points: this.generatePoints(
      this.props.width,
      this.props.height,
      this.props.segmentCount,
      this.props.layerCount,
      this.props.variance,
    )};

    console.log("Wavery constructor points", this.state.points);
  }

  public componentDidUpdate(_prevProps: ICustomWaveProps, _prevState: {}): void {
    this.setState({ points: this.generatePoints(
      this.props.width,
      this.props.height,
      this.props.segmentCount,
      this.props.layerCount,
      this.props.variance,
    )});
  }

  public generateSvg() {
    console.log("Generate SVG");
    //   Creates an element with the specified namespace URI
    const svg = document.createElementNS(svgns, 'svg');
    console.log("Generate SVG 2");
    svg.setAttribute('width', this.props.width+"");
    console.log("Generate SVG 3");
    svg.setAttribute('height', this.props.height+"");
    console.log("Generate SVG 4");
    svg.setAttribute('xmlns', svgns);
    console.log("Generate SVG 5");

    const pathList = [];

    // Append layer of a wave
    for (let i = 0; i < this.state.points.length; i++) {
      console.log("Generate SVG 5 - 1");
      pathList.push(
        this.generateClosedPath(
          this.state.points[i],
          { x: 0, y: this.props.height },
          { x: this.props.width, y: this.props.height },
          this.props.fillColor,
          this.props.strokeColor,
          this.props.strokeWidth,
        ),
      );
    }
    console.log("Generate SVG 6");

    const svgData: ISVG = {
        width: this.props.width,
        height: this.props.height,
        xmlns: svgns,
        path: pathList,
    };
    console.log("Generate SVG 7");

    return svgData;
  }

  private generateClosedPath(
    curvePoints: IPoint[],
    leftCornerPoint: IPoint,
    rightCornerPoint: IPoint,
    fillColor: string,
    strokeColor: string,
    strokeWidth,
  ) {

    console.log("Generate Closed Path");
    const xPoints = curvePoints.map((p) => p.x);
    const yPoints = curvePoints.map((p) => p.y);

    const xControlPoints = computeControlPoints(xPoints);
    const yControlPoints = computeControlPoints(yPoints);

    let path =
      `M ${leftCornerPoint.x},${leftCornerPoint.y} ` +
      `C ${leftCornerPoint.x},${leftCornerPoint.y} ` +
      `${xPoints[0]},${yPoints[0]} ` +
      `${xPoints[0]},${yPoints[0]} `;

    for (let i = 0; i < xPoints.length - 1; i++) {
      path +=
        `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ` +
        `${xControlPoints.p2[i]},${yControlPoints.p2[i]} ` +
        `${xPoints[i + 1]},${yPoints[i + 1]} `;
    }

    path +=
      `C ${xPoints[xPoints.length - 1]},${yPoints[xPoints.length - 1]} ` +
      `${rightCornerPoint.x},${rightCornerPoint.y} ` +
      `${rightCornerPoint.x},${rightCornerPoint.y} Z`;

    const svgPath = document.createElementNS(svgns, 'path');
    svgPath.setAttributeNS(null, 'fill', fillColor);
    svgPath.setAttributeNS(null, 'stroke', strokeColor);
    svgPath.setAttributeNS(null, 'stroke-width', strokeWidth);
    svgPath.setAttributeNS(null, 'd', path);

    return {
      fill: fillColor,
      strokeColor: strokeColor,
      strokeWidth: strokeWidth,
      d: path,
    };
  }


  // layer count is default to 2. Increasing the number would stack up n-1 waves.
  private generatePoints(width: number, height: number, segmentCount: number, layerCount: number, variance: number) {
    const cellWidth: number = width / segmentCount;
    const cellHeight: number = height / layerCount;
    const moveLimitX: number = cellWidth * variance * 0.5;
    const moveLimitY: number = cellHeight * variance;

    const points = [];
    for (let y = cellHeight; y < height; y += cellHeight) {
      let pointsPerLayer = [];
      pointsPerLayer.push({ x: 0, y: Math.floor(y) });
      for (let x = cellWidth; x < width; x += cellWidth) {
        // this decides whether a segment is crest or trough
        const varietalY = y - moveLimitY / 2 + Math.random() * moveLimitY;
        const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX;
        pointsPerLayer.push({
          x: Math.floor(varietalX),
          y: Math.floor(varietalY),
        });
      }
      pointsPerLayer.push({ x: width, y: Math.floor(y) });
      points.push(pointsPerLayer);
    }
    return points;
  }

  public render(): React.ReactElement<ICustomWaveProps> {
    const genSVG: ISVG = this.generateSvg();
    console.log("Generated SVG", genSVG);

    const { path } = genSVG;
    const numWaves: number = path.length;
    const opacity: string[] = OPACITY_ARR.slice(MAX_WAVES - numWaves);

    console.log("Number of waves", genSVG);
    console.log("Number of paths", path);

    console.log("Color", Color(this.props.fillColor));
    console.log("Color Hex", Color(this.props.fillColor).hex());

    const svg = path.map((p, index) => {
      console.log("Layer index", index, Color(this.props.fillColor).hex()+opacity[index], opacity[index]);
      const color: string = Color(this.props.fillColor).hex()+opacity[index];
      return this.props.gradient && index < path.length-1 ? (
        [
          <defs>
            {/* <linearGradient id={`gradient`}  x1="0%" y1="0%" x2="0%" y2="100%"> */}
            <linearGradient id={`gradient_${this.props.uniqueId}`}>
              <stop
                offset="5%"
                stop-color={color}
              />
              <stop
                offset="95%"
                stop-color={color}
              />
            </linearGradient>
          </defs>,
          <path
            key={index}
            d={p.d}
            stroke={p.strokeColor}
            strokeWidth={p.strokeWidth}
            fill={this.props.gradient ? `url(#gradient_${this.props.uniqueId})` : color}
          ></path>,
        ]
      ) : (
        <path
          key={index}
          d={p.d}
          stroke={p.strokeColor}
          strokeWidth={p.strokeWidth}
          fill={this.props.fillColor}
        ></path>
      );
});

    return (
      // <><g transform="scale(-1,1)">{svg}</g></>
      <>{svg}</>
    );
  }
}

