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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/${count}_APP_IPHONE_55_${count}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/${count}_APP_IPHONE_65_${count}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/${count}_APP_IPAD_PRO_129_${count}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/${count}_APP_IPAD_PRO_3GEN_129_${count}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/images/featureGraphic`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/images/phoneScreenshots/${count}_${platfomLocale.locale}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/images/sevenInchScreenshots/${count}_${platfomLocale.locale}`,
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
          getName: (platfomLocale, count) =>
            `${platfomLocale.locale}/images/tenInchScreenshots/${count}_${platfomLocale.locale}`,
          maxCount: 8,
        },
      },
    ],
  };
}
