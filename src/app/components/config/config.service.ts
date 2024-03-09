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
}
