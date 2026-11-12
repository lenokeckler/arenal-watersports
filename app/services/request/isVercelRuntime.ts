import { CLIENT_RUNTIME } from "@/app/constants";

export const isVercelRuntime = (): boolean =>
  process.env[CLIENT_RUNTIME.VERCEL_ENVIRONMENT_NAME] ===
  CLIENT_RUNTIME.VERCEL_ENABLED_VALUE;
