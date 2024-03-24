import { z } from "zod";

const clientConfigSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  apiUrl: z.string().url().readonly(),
});

export const clientConfig = clientConfigSchema.parse({
  apiUrl: process.env.NEXT_PUBLIC_WEB_CLIENT_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});
