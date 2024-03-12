import { ChangeFontsHistory } from "../../cmds/change_fonts/change_fonts.state";
import { CreateTemplatesState } from "../../cmds/create_templates/create_templates.state";
import { TranslateState } from "../../cmds/translate/translate.state";
import { ConfigRepository, ConfigService } from "./config.interface";

export class ConfigServiceImpl implements ConfigService {
  constructor(private configRepository: ConfigRepository) {}

  public async getTranslateState(): Promise<TranslateState | undefined> {
    const config = await this.configRepository.get();
    return config?.translateState;
  }

  public async setTranslateState(
    translateState: TranslateState
  ): Promise<void> {
    const config = await this.configRepository.get();
    this.configRepository.set({
      ...config,
      translateState,
    });
  }

  public async getCreateTemplatesState(): Promise<
    CreateTemplatesState | undefined
  > {
    const config = await this.configRepository.get();
    return config?.createTemplatesState;
  }

  public async setCreateTemplatesState(
    createTemplatesState: CreateTemplatesState
  ): Promise<void> {
    const config = await this.configRepository.get();
    this.configRepository.set({
      ...config,
      createTemplatesState,
    });
  }

  public async getReplaceFontHistory(): Promise<
    ChangeFontsHistory | undefined
  > {
    const config = await this.configRepository.get();
    return config?.changeFontsHistory;
  }

  public async setReplaceFontHistory(
    changeFontsHistory: ChangeFontsHistory
  ): Promise<void> {
    const config = await this.configRepository.get();
    this.configRepository.set({
      ...config,
      changeFontsHistory,
    });
  }

  public async clear(): Promise<void> {
    await figma.clientStorage.deleteAsync(this.configRepository.key);
  }
}
