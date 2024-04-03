import { config } from "dotenv";
import { z } from "zod";

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  API_PORT: z.coerce.number(),
});

const env = envSchema.safeParse(config().parsed);

if (!env.success) {
  console.error("Environment variables not set correctly. See below:");
  console.error(env.error.errors);

  process.exit(1);
}

export default env.data;
