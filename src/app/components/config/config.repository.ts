import { Config, ConfigRepository } from "./config.interface";

export class ConfigRepositoryImpl implements ConfigRepository {
  public key = "config";

  public async get(): Promise<Partial<Config>> {
    return (await figma.clientStorage.getAsync(this.key)) ?? {};
  }

  public set(config: Partial<Config>): Promise<void> {
    return figma.clientStorage.setAsync(this.key, config);
  }
}
