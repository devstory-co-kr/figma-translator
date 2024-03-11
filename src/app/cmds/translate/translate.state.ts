import { Fonts } from "../../components/figma/figma.interface";
import { TranslatorLanguage } from "../../components/translator_language/translator_language.interface";

export type TranslateState = {
  autoSize: boolean;
  useCache: boolean;
  sourceLanguage: TranslatorLanguage;
  exclusionKeywords: string[];
  fontReplacementState: {
    language: TranslatorLanguage;
    fontName: string;
    font: FontName;
    isChecked: boolean;
    isVisible: boolean;
  }[];
  fonts: Fonts;
};
