export class ConfigSchema {
  REACT_APP_OAUTH_VIEW_API_URL!: string;
  PORT!: number;
}

class ConfigService {
  private readonly configuration: ConfigSchema;

  constructor() {
    this.configuration = process.env as any as ConfigSchema;
  }

  get<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
    return this.configuration[key];
  }
}

export const config = new ConfigService();
