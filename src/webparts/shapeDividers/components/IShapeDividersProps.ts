import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IShapeDividersProps {
  themeVariant: IReadonlyTheme | undefined;
  top: boolean;
  horizontalFlip: boolean;
  height: number;
  width: number;
  shape: string;
  shapeColor: string;
  numWaves: number;
  numLayers: number;
}
