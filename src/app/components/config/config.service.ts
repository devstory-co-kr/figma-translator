import { ConfigEntity } from "./config";
import { Config, ConfigRepository, ConfigService } from "./config.interface";

export class ConfigServiceImpl implements ConfigService {
  constructor(private configRepository: ConfigRepository) {}

  public async get(): Promise<Config> {
    return (
      (await this.configRepository.get()) ||
      new ConfigEntity({
        googleAPIKey: "",
      })
    );
  }
}
