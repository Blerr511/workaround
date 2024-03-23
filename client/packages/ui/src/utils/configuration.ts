export const config = {
  backendApi: process.env.WEB_CLIENT_API_URL,
} as const;

Object.freeze(config);
