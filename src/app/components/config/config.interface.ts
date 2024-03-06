export interface Config {
  googleAPIKey: string;
}

export interface ConfigService {
  get(): Promise<Config>;
}

export interface ConfigRepository {
  get(): Promise<Config | undefined>;
  set(config: Config): Promise<void>;
  clear(): Promise<void>;
}
