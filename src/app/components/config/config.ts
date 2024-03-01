import { Config } from "./config.interface";

export class ConfigEntity implements Config {
  public googleAPIKey: string;

  constructor({ googleAPIKey }: Config) {
    this.googleAPIKey = googleAPIKey;
  }
}
