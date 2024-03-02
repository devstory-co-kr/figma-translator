import {
  Platform,
  Template,
  TemplateRepository,
  TemplateType,
} from "./template.interface";

export class TemplateRepositoryImpl implements TemplateRepository {
  public templates: { [platform in Platform]: Template[] } = {
    [Platform.iOS]: [
      {
        name: "iPhone5.5",
        platform: Platform.iOS,
        type: TemplateType.mobile,
        frame: {
          size: {
            w: 1242,
            h: 2208,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/${count}_APP_IPHONE_55_${count}.png`,
          maxCount: 10,
        },
      },
      {
        name: "iPhone6.5",
        platform: Platform.iOS,
        type: TemplateType.mobile,
        frame: {
          size: {
            w: 1284,
            h: 2778,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/${count}_APP_IPHONE_65_${count}.png`,
          maxCount: 10,
        },
      },
      {
        name: "iPad 12.9 2GEN",
        platform: Platform.iOS,
        type: TemplateType.tablet,
        frame: {
          size: {
            w: 2048,
            h: 2732,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/${count}_APP_IPAD_PRO_129_${count}.png`,
          maxCount: 10,
        },
      },
      {
        name: "iPad 12.9 3GEN",
        platform: Platform.iOS,
        type: TemplateType.tablet,
        frame: {
          size: {
            w: 2048,
            h: 2732,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/${count}_APP_IPAD_PRO_3GEN_129_${count}.png`,
          maxCount: 10,
        },
      },
    ],
    [Platform.Android]: [
      {
        name: "Grapic",
        platform: Platform.Android,
        type: TemplateType.grapic,
        frame: {
          size: {
            w: 1024,
            h: 500,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale.locale}/images/featureGraphic.png`,
          maxCount: 8,
        },
      },
      {
        name: "Mobile",
        platform: Platform.Android,
        type: TemplateType.mobile,
        frame: {
          size: {
            w: 1242,
            h: 2208,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/images/phoneScreenshots/${count}_${platfomLocale}`,
          maxCount: 8,
        },
      },
      {
        name: "Tablet 7-inch",
        platform: Platform.Android,
        type: TemplateType.tablet,
        frame: {
          size: {
            w: 2048,
            h: 2732,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/images/sevenInchScreenshots/${count}_${platfomLocale}`,
          maxCount: 8,
        },
      },
      {
        name: "Tablet 10-inch",
        platform: Platform.Android,
        type: TemplateType.tablet,
        frame: {
          size: {
            w: 2048,
            h: 2732,
          },
          frameName: (platfomLocale, count) =>
            `${platfomLocale}/images/tenInchScreenshots/${count}_${platfomLocale}`,
          maxCount: 8,
        },
      },
    ],
  };
}
