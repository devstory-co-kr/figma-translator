import { Platform } from "../../params/platform.param";
import {
  Template,
  TemplateRepository,
  TemplateType,
} from "./template.interface";

export class TemplateRepositoryImpl implements TemplateRepository {
  public count: string = "count";
  public locale: string = "locale";
  public templates: { [platform in Platform]: Template[] } = {
    [Platform.iOS]: [
      {
        name: "iPhone 5.5",
        platform: Platform.iOS,
        type: TemplateType.mobile,
        frame: {
          size: {
            w: 1242,
            h: 2208,
          },
          name: `ios/${this.locale}/${this.count}_APP_IPHONE_55_${this.count}`,
          maxCount: 10,
        },
      },
      {
        name: "iPhone 6.5",
        platform: Platform.iOS,
        type: TemplateType.mobile,
        frame: {
          size: {
            w: 1284,
            h: 2778,
          },
          name: `ios/${this.locale}/${this.count}_APP_IPHONE_65_${this.count}`,
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
          name: `ios/${this.locale}/${this.count}_APP_IPAD_PRO_129_${this.count}`,
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
          name: `ios/${this.locale}/${this.count}_APP_IPAD_PRO_3GEN_129_${this.count}`,
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
          name: `android/${this.locale}/images/featureGraphic`,
          maxCount: 1,
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
          name: `android/${this.locale}/images/phoneScreenshots/${this.count}_${this.locale}`,
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
          name: `android/${this.locale}/images/sevenInchScreenshots/${this.count}_${this.locale}`,
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
          name: `android/${this.locale}/images/tenInchScreenshots/${this.count}_${this.locale}`,
          maxCount: 8,
        },
      },
    ],
  };
}
