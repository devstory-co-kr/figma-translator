import { PlatformLocale } from "../../components/platform/platform.interface";
import { Template } from "../../components/template/template.interface";
import { TextDirection } from "../../components/translator_language/translator_language.interface";
import { Platform } from "../../params/platform.param";

export type CreateTemplatesState = {
  platform: Platform;
  textDirection: TextDirection;
  templateScale: number;
  targetLocales: {
    [platform in Platform]: {
      [textDirection in TextDirection]: {
        targetLocale: PlatformLocale;
        isChecked: true;
        isVisible: true;
      }[];
    };
  };
  templates: {
    [platform in Platform]: {
      template: Template;
      isChecked: boolean;
      count: number;
    }[];
  };
};
