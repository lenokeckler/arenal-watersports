import { handleProxyRequest } from "@/app/services/route-access/handleProxyRequest";

export const proxy = handleProxyRequest;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
