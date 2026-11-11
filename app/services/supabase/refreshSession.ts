import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";
import {
  SESSION_CLAIM,
  SESSION_STATE,
  SUPABASE,
  SUPABASE_COOKIE_OPTIONS,
  SUPABASE_SIGN_OUT_SCOPE,
} from "@/app/constants";
import type { Database } from "@/app/types";
import { readSessionState } from "./readSessionState";
import type { SessionRefresh } from "./models/SessionRefresh.interface";

export const refreshSupabaseSession = async (
  request: NextRequest
): Promise<SessionRefresh> => {
  let response = NextResponse.next({ request });

  const supabaseClient = createServerClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY,
    {
      cookieOptions: SUPABASE_COOKIE_OPTIONS,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(name, value, options);
            }
          );
        },
      },
    }
  );

  const { data, error } =
    await supabaseClient.auth.getClaims();

  const claims = error ? null : data?.claims;

  const sessionState = claims
    ? await readSessionState(supabaseClient)
    : SESSION_STATE.ENDED;
  const isSessionLive = sessionState === SESSION_STATE.LIVE;
  const isSessionIdle = sessionState === SESSION_STATE.IDLE;

  if (isSessionIdle) {
    await supabaseClient.auth.signOut({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    });
  }

  return {
    hasSession: isSessionLive,
    isSessionIdle,
    mustChangePassword:
      isSessionLive &&
      claims?.[SESSION_CLAIM.MUST_CHANGE_PASSWORD] === true,
    response,
  };
};
