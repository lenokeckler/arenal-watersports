import {
  NextResponse,
  type NextRequest,
} from "next/server";
import { refreshSupabaseSession } from "@/app/services/supabase/refreshSession";
import { canonicalizePathname } from "@/app/utils/pathname/canonicalizePathname";
import { resolveProxyRedirect } from "./resolveProxyRedirect";

export const handleProxyRequest = async (
  request: NextRequest
): Promise<NextResponse> => {
  const { response, ...sessionAccess } =
    await refreshSupabaseSession(request);
  const redirectPath = resolveProxyRedirect(
    canonicalizePathname(request.nextUrl.pathname),
    sessionAccess
  );

  if (redirectPath === null) {
    return response;
  }

  const redirectResponse = NextResponse.redirect(
    new URL(redirectPath, request.url)
  );
  response.cookies.getAll().forEach((refreshedCookie) => {
    redirectResponse.cookies.set(refreshedCookie);
  });

  return redirectResponse;
};
