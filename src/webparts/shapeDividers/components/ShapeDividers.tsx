import * as React from 'react';
import styles from './ShapeDividers.module.scss';
import { IShapeDividersProps } from './IShapeDividersProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export default class ShapeDividers extends React.Component<IShapeDividersProps, {}> {
  public render(): React.ReactElement<IShapeDividersProps> {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    let svgPath;

    switch (this.props.wave) {
      case "wave":
        svgPath = <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      case "curve":
        svgPath = <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      case "asymmetricalcurve":
        svgPath = <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      case "triangle":
        svgPath = <path d="M1200 0L0 0 598.97 114.72 1200 0z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      case "asymmetricaltriangle":
        svgPath = <path d="M1200 0L0 0 892.25 114.72 1200 0z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      case "arrow":
        svgPath = <path d="M649.97 0L550.03 0 599.91 54.12 649.97 0z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
      default:
        svgPath = <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }} transform={this.props.horizontalFlip ? 'matrix(-1 0 0 1 1200 0)' : undefined}></path>
        break;
    }
    return (
      <div className={styles.shapeDividers} style={{ backgroundColor: this.props.top ? semanticColors.bodyBackground : 'white' }}>
        <div style={{
          height: `${this.props.height}px`, overflow: 'hidden'
        }} >
          {/* <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}><path d="M0.00,49.98 C63.48,81.41 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: this.props.top ? 'white' : semanticColors.bodyBackground }}></path></svg> */}
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
            {svgPath}
          </svg>

        </div>
      </div>
    );
  }
}
