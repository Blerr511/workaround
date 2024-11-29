export const CONFIG_STORAGE_TOKEN = Symbol('CONFIG_STORAGE_TOKEN');
export const CONFIG_OPTIONS_TOKEN = Symbol('CONFIG_OPTIONS_TOKEN');


export interface ConfigModuleOptions {
    ignoreValidation?: boolean;
    prefix?: string;
  }
