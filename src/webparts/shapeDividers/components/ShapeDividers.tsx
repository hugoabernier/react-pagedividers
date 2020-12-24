import * as React from 'react';
import styles from './ShapeDividers.module.scss';
import { IShapeDividersProps } from './IShapeDividersProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { CustomWave } from './CustomWave';

export default class ShapeDividers extends React.Component<IShapeDividersProps, {}> {


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
          <path data-v-8c046fa2="" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" style={{ stroke: 'none', fill: fgColor }} opacity=".25"></path>
          <path data-v-8c046fa2="" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" style={{ stroke: 'none', fill: fgColor }} ></path>
          <path data-v-8c046fa2="" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" style={{ stroke: 'none', fill: fgColor }} ></path>
        </>;
        break;
      case "gradient":
        svgPath = <path
          d="M 0,400 C 0,400 0,200 0,200 C 100.89285714285714,176.82142857142856 201.78571428571428,153.64285714285714 335,167 C 468.2142857142857,180.35714285714286 633.7500000000001,230.25000000000003 759,233 C 884.2499999999999,235.74999999999997 969.2142857142858,191.35714285714286 1076,178 C 1182.7857142857142,164.64285714285714 1311.392857142857,182.32142857142856 1440,200 C 1440,200 1440,400 1440,400 Z"
          stroke="none" stroke-width="0" fill="url(#gradient)" className="transition-all duration-300 ease-in-out delay-150">
        </path>;
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
      <div className={styles.shapeDividers} style={{ backgroundColor: bgColor }}>
        { !this.props.top && <div style={{
          height: `${bufferHeight}px`,
          backgroundColor: fgColor
          }} ></div> }
        <div style={{
          height: `${this.props.height}px`,
          overflow: 'hidden',
          // marginTop: '-1px'
        }} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: `100%`, width: `${this.props.width}%` }}>
            {svgPath}
          </svg>
        </div>
        { this.props.top && <div style={{
          height: `${bufferHeight}px`,
          backgroundColor: bgColor
          }} ></div> }
      </div>
    );
  }
}
