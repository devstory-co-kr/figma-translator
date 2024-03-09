import { TranslatorLanguage } from "../../components/translator_language/translator_language.interface";

export type TranslateState = {
  autoSize: boolean;
  sourceLanguage: TranslatorLanguage;
  fontReplacementState: {
    language: TranslatorLanguage;
    fontName: string;
    font: FontName;
    isChecked: boolean;
    isVisible: boolean;
  }[];
};
