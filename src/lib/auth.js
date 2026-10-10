import nextEnv from "@next/env";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

nextEnv.loadEnvConfig(process.cwd());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

export const auth = betterAuth({
  appName: "Bazar Dor",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: pool,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});