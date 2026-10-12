import type { NextConfig } from "next";
import {
  ALL_ROUTES_SOURCE,
  SECURITY_HEADERS,
} from "./app/constants/security/SecurityHeaders.constants";

const nextConfig: NextConfig = {
  headers: () =>
    Promise.resolve([
      {
        source: ALL_ROUTES_SOURCE,
        headers: SECURITY_HEADERS,
      },
    ]),
  poweredByHeader: false,
  reactCompiler: true,
};

export default nextConfig;
