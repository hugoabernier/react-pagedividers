import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// Add support for section colors
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

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
  wave: string;
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
        wave: this.properties.wave
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
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneToggle('top', {
                  label: strings.TopFieldLabel,
                  checked: this.properties.top,
                  onText: strings.TopFieldOnText,
                  offText: strings.TopFieldOffText
                }),
                PropertyPaneToggle('horizontalFlip', {
                  label: "Direction",
                  checked: this.properties.horizontalFlip,
                  onText: "Left to right",
                  offText: "Right to left"
                }),
                PropertyPaneSlider('height', {
                  label: "Height",
                  min: 0,
                  max: 300,
                  step: 1,
                  showValue: true,
                  value: this.properties.height
                }),
                PropertyPaneSlider('width', {
                  label: "Width",
                  min: 100,
                  max: 300,
                  step: 1,
                  showValue: true,
                  value: this.properties.width
                }),
                PropertyPaneChoiceGroup('wave', {
                  label: "Shape",
                  options: [
                    {
                      key: 'slant',
                      text: 'Slant',
                      // selectedImageSrc: layoutBrick,
                      // imageSrc: layoutBrick,
                    },
                    {
                      key: 'wave',
                      text: 'Wave',
                      // selectedImageSrc: layoutGrid,
                      // imageSrc: layoutGrid,
                    },
                    {
                      key: 'curve',
                      text: 'Curve',
                      // selectedImageSrc: layoutCarousel,
                      // imageSrc: layoutCarousel,
                    },
                    {
                      key: 'asymmetricalcurve',
                      text: 'Asymmetrical curve'
                    },
                    {
                      key: 'triangle',
                      text: 'Triangle'
                    },
                    {
                      key: 'asymmetricaltriangle',
                      text: 'Asymmetrical triangle'
                    }
                  ]
                }),
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
