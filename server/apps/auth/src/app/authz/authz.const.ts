export const AUTH_Z_MODULE_SETTINGS_TOKEN = Symbol(
  'AUTH_Z_MODULE_SETTINGS_TOKEN',
);

export interface AuthZModuleSettings {
  domain: string;
  clientId: string;
  secret: string;
}
