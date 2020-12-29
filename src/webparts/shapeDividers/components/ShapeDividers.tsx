import * as React from 'react';
import styles from './ShapeDividers.module.scss';
import { IShapeDividersProps } from './IShapeDividersProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as d3 from 'd3';
import { path } from 'd3-path';

import { CustomWave } from './CustomWave';

export default class ShapeDividers extends React.Component<IShapeDividersProps, {}> {
  private _svg: SVGElement;

  public componentDidMount(): void {
    this.renderSeparator();
  }

  public componentDidUpdate(prevProps: IShapeDividersProps, prevState: {}): void {
    this.renderSeparator();
  }

  private renderSeparator() {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    const { shapeColor } = this.props;

    const bgColor: string = shapeColor;
    const fgColor: string = semanticColors.bodyBackground;
    const bufferHeight: number = (+styles.sectionminheight) - this.props.height - 1;
    const topBuffer: number = this.props.top ? 0 : bufferHeight;


    d3.select(this._svg).selectAll("*").remove();
    let path1 = d3.path();

    switch (this.props.shape) {
      case "wave":
        const waveTop: number = this.props.top ? 0 : bufferHeight;
        path1 = `M321.39,56.44
        C379.39,45.65,435.55,26.31,493.39,14.58
        C575.78,-2.14,661.58,-3.15,743.84,14.19
        C823.78,31,906.67,72,985.66,92.83
        C1055.71,111.31,1132.19,118.92,1200,95.83
        V0
        H0
        V27.35
        A600.21,600.21,0,0,0,321.39,56.44Z`;
        
        //<path d="M 321.4 56.4 C 379.4 45.6 435.6 26.3 493.4 14.6 C 575.8 -2.1 661.6 -3.1 743.8 14.2 C 823.8 31 906.7 72 985.7 92.8 C 1055.7 111.3 1132.2 118.9 1200 95.8 V 0 H 0 V 27.4 A 600.2 600.2 0 0 0 321.4 56.4 Z" fill="red"></path>
        // path1.moveTo(321.39, 56.44);
        // path1.bezierCurveTo(379.39, 45.65, 435.55, 26.31, 493.39, 14.58);
        // path1.bezierCurveTo(575.78, -2.14, 661.58, -3.15, 743.84, 14.19);
        // path1.bezierCurveTo(823.78, 31, 906.67, 72, 985.66, 92.83);
        // path1.bezierCurveTo(1055.71, 111.31, 1132.19, 118.92, 1200, 95.83);
        // path1.lineTo(1200, 0);
        // path1.lineTo(0, 0);
        // path1.lineTo(0, 27.35);
        // path1.arc(600.21,600.21,0,0,0,321.39,56.44);
        // path1.closePath();
        break;
      case "triangle":
        //const data = [[0,0],[1200,0],[1200, topBuffer], [600, topBuffer+ this.props.height], [0, topBuffer]];
        path1.moveTo(0, 0);
        path1.lineTo(1200, 0);
        path1.lineTo(1200, topBuffer);
        path1.lineTo(600, topBuffer + this.props.height);
        path1.lineTo(0, topBuffer);
        path1.closePath();
        break;

      case "offsettriangle":
        path1.moveTo(0, 0);
        path1.lineTo(1200, 0);
        path1.lineTo(1200, topBuffer);
        path1.lineTo(892.25, topBuffer + this.props.height);
        path1.lineTo(0, topBuffer);
        path1.closePath();
        break;
      default:
        break;
    }


    d3.select(this._svg)
      .append("path")
      .attr("d", path1)
      .attr("fill", bgColor)
      .attr("transform", this.props.horizontalFlip ? "matrix(-1 0 0 1 1200 0)" : undefined);
  }

  public render(): React.ReactElement<IShapeDividersProps> {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    const { shapeColor } = this.props;

    const bgColor: string = shapeColor;
    const fgColor: string = semanticColors.bodyBackground;

    const bufferHeight: number = (+styles.sectionminheight) - this.props.height;

    let svgPath: JSX.Element;

    switch (this.props.shape) {
      case "wave":
        svgPath = <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "curve":
        svgPath = <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "offsetcurve":
        svgPath = <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "triangle":
        svgPath = <path d="M1200 0L0 0 598.97 114.72 1200 0z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "offsettriangle":
        svgPath = <path d="M1200 0L0 0 892.25 114.72 1200 0z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "arrow":
        svgPath = <path d="M649.97 0L550.03 0 599.91 54.12 649.97 0z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
      case "waves":
        svgPath = <>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" style={{ stroke: 'none', fill: fgColor }} opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" style={{ stroke: 'none', fill: fgColor }} ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" style={{ stroke: 'none', fill: fgColor }} ></path>
        </>;
        break;
      case "custom":
        svgPath = <CustomWave
          height={120}
          width={1200}
          fillColor={fgColor}
          bgColor={bgColor}
          strokeColor={'none'}
          segmentCount={this.props.numWaves}
          layerCount={this.props.numLayers}
          gradient={this.props.gradient}
          variance={0.75}
          strokeWidth={0}
          uniqueId={this.props.uniqueId}></CustomWave>;

        break;
      default:
        svgPath = <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" style={{ stroke: 'none', fill: fgColor }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>;
        break;
    }



    return (
      <div className={styles.shapeDividers}>
        <svg
          ref={(elm: SVGSVGElement) => this._svg = elm}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 320"
          style={{ height: `320px`, width: `${this.props.width}%`, border: 'none' }}
        >
        </svg>
      </div>
    );
  }
}
