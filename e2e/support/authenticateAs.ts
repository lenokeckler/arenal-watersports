import type { BrowserContext } from "@playwright/test";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE } from "@/app/constants";
import {
  E2E_COOKIE_DEFAULT_MAX_AGE_SECONDS,
  E2E_COOKIE_SAME_SITE,
} from "../constants/E2eAuth.constants";
import type { E2ePlaywrightSameSite } from "../constants/E2eAuth.constants";
import { E2E_BASE_URL } from "../constants/E2eRuntime.constants";
import type { E2eAccountCredentials } from "../models/E2eAccountCredentials.interface";
import type { E2eCapturedCookie } from "../models/E2eCapturedCookie.interface";

const MILLISECONDS_PER_SECOND = 1_000;

const SUPABASE_SAME_SITE_TO_PLAYWRIGHT: Record<
  string,
  E2ePlaywrightSameSite
> = {
  lax: E2E_COOKIE_SAME_SITE.LAX,
  none: E2E_COOKIE_SAME_SITE.NONE,
  strict: E2E_COOKIE_SAME_SITE.STRICT,
};

const resolvePlaywrightSameSite = (
  sameSite: E2eCapturedCookie["options"]["sameSite"]
): E2ePlaywrightSameSite =>
  SUPABASE_SAME_SITE_TO_PLAYWRIGHT[String(sameSite)] ??
  E2E_COOKIE_SAME_SITE.LAX;

const resolveCookieExpirySeconds = (
  options: E2eCapturedCookie["options"]
): number => {
  const nowInSeconds = Math.floor(
    Date.now() / MILLISECONDS_PER_SECOND
  );

  if (options.maxAge !== undefined) {
    return nowInSeconds + options.maxAge;
  }

  if (options.expires) {
    return Math.floor(
      options.expires.getTime() / MILLISECONDS_PER_SECOND
    );
  }

  return nowInSeconds + E2E_COOKIE_DEFAULT_MAX_AGE_SECONDS;
};

const collectSessionCookies = async (
  credentials: E2eAccountCredentials
): Promise<E2eCapturedCookie[]> => {
  const capturedCookies: E2eCapturedCookie[] = [];

  const supabase = createServerClient(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    {
      cookies: {
        getAll: () => [],
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(
            ({ name, options, value }) => {
              capturedCookies.push({
                name,
                options,
                value,
              });
            }
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw error;
  }

  return capturedCookies;
};

export const authenticateAs = async (
  context: BrowserContext,
  credentials: E2eAccountCredentials
): Promise<void> => {
  const capturedCookies =
    await collectSessionCookies(credentials);

  await context.addCookies(
    capturedCookies.map(({ name, options, value }) => ({
      expires: resolveCookieExpirySeconds(options),
      httpOnly: options.httpOnly ?? false,
      name,
      sameSite: resolvePlaywrightSameSite(options.sameSite),
      secure: options.secure ?? false,
      url: E2E_BASE_URL,
      value,
    }))
  );
};
