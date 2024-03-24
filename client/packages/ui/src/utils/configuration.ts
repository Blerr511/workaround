export const config = {
  backendApi: process.env.NEXT_PUBLIC_WEB_CLIENT_API_URL,
} as const;

Object.freeze(config);
