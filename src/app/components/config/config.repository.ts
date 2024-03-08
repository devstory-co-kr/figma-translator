import { Config, ConfigRepository } from "./config.interface";

export class ConfigRepositoryImpl implements ConfigRepository {
  private key = "config";

  public async get(): Promise<Partial<Config>> {
    return (await figma.clientStorage.getAsync(this.key)) ?? {};
  }

  public set(config: Config): Promise<void> {
    return figma.clientStorage.setAsync(this.key, config);
  }

  public clear(): Promise<void> {
    return figma.clientStorage.deleteAsync(this.key);
  }
}
