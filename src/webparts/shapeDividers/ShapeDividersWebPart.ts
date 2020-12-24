import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneLabel,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// Add support for section colors
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

// Added to allow picking the background color
import { PropertyFieldSwatchColorPicker, PropertyFieldSwatchColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldSwatchColorPicker';

import * as strings from 'ShapeDividersWebPartStrings';
import ShapeDividers from './components/ShapeDividers';
import { IShapeDividersProps } from './components/IShapeDividersProps';

export interface IShapeDividersWebPartProps {
  top: boolean;
  height: number;
  width: number;
  segmentCount: number;
  layerCount: number;
  horizontalFlip: boolean;
  shape: string;
  shapeColor: string;
  numWaves: number;
  numLayers: number;
  gradient: boolean;
}

export default class ShapeDividersWebPart extends BaseClientSideWebPart<IShapeDividersWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    //themePrimary
    //themeLighterAlt
    //neutralLighter
    //primaryBackground
    if (this.properties.shapeColor === undefined || this.properties.shapeColor === "") {
      // Set default colors
      if (this._themeVariant.semanticColors.bodyBackground === this._themeVariant.palette.white) {
        this.properties.shapeColor = this._themeVariant.palette.themePrimary;
      } else {
        this.properties.shapeColor = this._themeVariant.palette.white;
      }
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IShapeDividersProps> = React.createElement(
      ShapeDividers,
      {
        themeVariant: this._themeVariant,
        top: this.properties.top,
        horizontalFlip: this.properties.horizontalFlip,
        height: this.properties.height,
        shape: this.properties.shape,
        width: this.properties.width,
        shapeColor: this.properties.shapeColor,
        numWaves: this.properties.numWaves,
        numLayers: this.properties.numLayers,
        gradient: this.properties.gradient,
        uniqueId: this.instanceId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { palette } = this._themeVariant;
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('top', {
                  label: strings.TopFieldLabel,
                  checked: this.properties.top,
                  onText: strings.TopFieldOnText,
                  offText: strings.TopFieldOffText
                }),
                PropertyPaneToggle('horizontalFlip', {
                  label: strings.HorizontalFlipFieldLabel,
                  checked: this.properties.horizontalFlip,
                  onText: strings.HorizontalFlipOnText,
                  offText: strings.HorizontalFlipOffText
                }),
                PropertyPaneSlider('height', {
                  label: strings.HeightFieldLabel,
                  min: 0,
                  max: 300,
                  step: 1,
                  showValue: true,
                  value: this.properties.height
                }),
                PropertyPaneSlider('width', {
                  label: strings.WidthFieldLabel,
                  min: 100,
                  max: 300,
                  step: 1,
                  showValue: true,
                  value: this.properties.width
                }),
                PropertyPaneChoiceGroup('shape', {
                  label: strings.ShapeFieldLabel,
                  options: [
                    {
                      key: 'slant',
                      text: strings.ShapeSlant,
                      selectedImageSrc: require('./assets/slant.svg'),
                      imageSrc: require('./assets/slant.svg'),
                    },
                    {
                      key: 'wave',
                      text: strings.ShapeWave,
                      selectedImageSrc: require('./assets/wave.svg'),
                      imageSrc: require('./assets/wave.svg'),
                    },
                    {
                      key: 'curve',
                      text: strings.ShapeCurve,
                      selectedImageSrc: require('./assets/curve.svg'),
                      imageSrc: require('./assets/curve.svg'),
                    },
                    {
                      key: 'offsetcurve',
                      text: strings.ShapeOffsetCurve,
                      selectedImageSrc: require('./assets/offsetcurve.svg'),
                      imageSrc: require('./assets/offsetcurve.svg'),
                    },
                    {
                      key: 'triangle',
                      text: strings.ShapeTriangle,
                      selectedImageSrc: require('./assets/triangle.svg'),
                      imageSrc: require('./assets/triangle.svg'),
                    },
                    {
                      key: 'offsettriangle',
                      text: strings.ShapeOffsetTriangle,
                      selectedImageSrc: require('./assets/offsettriangle.svg'),
                      imageSrc: require('./assets/offsettriangle.svg'),
                    },
                    {
                      key: 'waves',
                      text: strings.ShapeWaves,
                      selectedImageSrc: require('./assets/waves.svg'),
                      imageSrc: require('./assets/waves.svg'),
                    },
                    {
                      key: 'custom',
                      text: strings.ShapeCustom,
                      selectedImageSrc: require('./assets/custom.svg'),
                      imageSrc: require('./assets/custom.svg'),
                    }
                  ]
                }),
              ]
            },
            {
              groupName: strings.ColorGroupName,
              groupFields: [
                PropertyFieldSwatchColorPicker('shapeColor', {
                  label: strings.ShapeColorFieldName,
                  selectedColor: this.properties.shapeColor,
                  colors: [
                    { color: this._themeVariant.palette.white, label: strings.ShapeColorNone },
                    { color: this._themeVariant.palette.neutralLighter, label: strings.ShapeColorNeutral },
                    { color: this._themeVariant.palette.themeLighterAlt, label: strings.ShapeColorSoft },
                    { color: this._themeVariant.palette.themePrimary, label: strings.ShapeColorStrong },
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'colorFieldId'
                }),
                this.properties.shapeColor === this._themeVariant.semanticColors.bodyBackground &&
                PropertyPaneLabel('color', {
                  text: strings.ShapeColorWarning, required: false
                })
              ]
            },
            {
              groupName: strings.CustomShapeGroupName,
              groupFields: [
                PropertyPaneSlider('numWaves', {
                  label: strings.NumWavesFieldLabel,
                  max: 20,
                  min: 1,
                  step: 1,
                  showValue: true,
                  value: this.properties.numWaves
                }),
                PropertyPaneSlider('numLayers', {
                  label: strings.NumLayersFieldLabel,
                  max: 5,
                  min: 2,
                  step: 1,
                  showValue: true,
                  value: this.properties.numLayers
                }),
                PropertyPaneToggle('gradient', {
                  label: strings.CustomShapeGradientLabel,
                  checked: this.properties.gradient
                })
              ]
            }
          ]
        }
      ]
    };
  }


  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
}
