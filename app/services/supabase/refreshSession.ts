import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";
import {
  SESSION_CLAIM,
  SUPABASE,
  SUPABASE_COOKIE_OPTIONS,
} from "@/app/constants";
import type { Database } from "@/app/types";
import { readSessionLiveness } from "./readSessionLiveness";
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

  const isSessionLive = claims
    ? await readSessionLiveness(supabaseClient)
    : false;

  return {
    hasSession: isSessionLive,
    mustChangePassword:
      isSessionLive &&
      claims?.[SESSION_CLAIM.MUST_CHANGE_PASSWORD] === true,
    response,
  };
};
