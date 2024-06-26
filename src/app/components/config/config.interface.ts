import { CreateTemplatesState } from "../../cmds/create_templates/create_templates.state";
import { TranslateState } from "../../cmds/translate/translate.state";

export interface Config {
  translateState: TranslateState;
  createTemplatesState: CreateTemplatesState;
  changeFontsHistory: FontName[];
}

export interface ConfigService {
  getTranslateState(): Promise<TranslateState | undefined>;
  setTranslateState(translateState: TranslateState): Promise<void>;

  getCreateTemplatesState(): Promise<CreateTemplatesState | undefined>;
  setCreateTemplatesState(
    createTemplatesState: CreateTemplatesState
  ): Promise<void>;

  getReplaceFontHistory(): Promise<FontName[] | undefined>;
  setReplaceFontHistory(replaceFontHistory: FontName[]): Promise<void>;

  clear(): Promise<void>;
}

export interface ConfigRepository {
  key: string;
  get(): Promise<Partial<Config>>;
  set(config: Partial<Config>): Promise<void>;
}
