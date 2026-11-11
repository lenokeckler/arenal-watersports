import { loadEnvConfig } from "@next/env";
import {
  E2E_LOCAL_SUPABASE_HOSTS,
  E2E_SUPABASE_ENV,
  E2E_SUPABASE_ERROR,
} from "../constants/E2eSupabase.constants";
import type { LocalSupabaseEnvironment } from "./models/LocalSupabaseEnvironment.interface";

const readRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(E2E_SUPABASE_ERROR.MISSING_ENV(name));
  }

  return value;
};

export const readLocalSupabaseEnvironment =
  (): LocalSupabaseEnvironment => {
    loadEnvConfig(process.cwd());

    const url = readRequiredEnv(E2E_SUPABASE_ENV.URL);
    const { hostname } = new URL(url);

    if (!E2E_LOCAL_SUPABASE_HOSTS.includes(hostname)) {
      throw new Error(
        E2E_SUPABASE_ERROR.NOT_LOCAL(hostname)
      );
    }

    return {
      anonKey: readRequiredEnv(E2E_SUPABASE_ENV.ANON_KEY),
      serviceRoleKey: readRequiredEnv(
        E2E_SUPABASE_ENV.SERVICE_ROLE_KEY
      ),
      url,
    };
  };
