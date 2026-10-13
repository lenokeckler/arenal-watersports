import {
  NextResponse,
  type NextRequest,
} from "next/server";
import { refreshSupabaseSession } from "@/app/services/supabase/refreshSession";
import { resolveProxyRedirect } from "./resolveProxyRedirect";

export const handleProxyRequest = async (
  request: NextRequest
): Promise<NextResponse> => {
  const { hasSession, response } =
    await refreshSupabaseSession(request);
  const redirectPath = resolveProxyRedirect(
    request.nextUrl.pathname,
    hasSession
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
