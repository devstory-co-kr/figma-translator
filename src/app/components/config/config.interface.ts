import { TranslateState } from "../../cmds/translate/translate.state";

export interface Config {
  translateState: TranslateState;
}

export interface ConfigService {
  getTranslateState(): Promise<TranslateState | undefined>;
  setTranslateState(translateState: TranslateState): Promise<void>;
}

export interface ConfigRepository {
  get(): Promise<Partial<Config>>;
  set(config: Config): Promise<void>;
  clear(): Promise<void>;
}
