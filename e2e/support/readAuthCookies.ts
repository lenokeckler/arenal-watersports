import type {
  BrowserContext,
  Cookie,
} from "@playwright/test";
import { isAuthCookieName } from "./isAuthCookieName";

export const readAuthCookies = async (
  context: BrowserContext
): Promise<Cookie[]> =>
  (await context.cookies()).filter(({ name }) =>
    isAuthCookieName(name)
  );
