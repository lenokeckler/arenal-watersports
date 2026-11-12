import type { NextConfig } from "next";
import {
  ALL_ROUTES_SOURCE,
  SECURITY_HEADERS,
} from "./app/constants/security/SecurityHeaders.constants";
import { PATHS } from "./app/constants/strings/Paths.constants";
import { SUPABASE } from "./app/constants/supabase/Supabase.constants";
import { buildCategoryImageConfig } from "./app/utils/category-image/buildCategoryImageConfig";

const nextConfig: NextConfig = {
  agentRules: false,
  headers: () =>
    Promise.resolve([
      {
        source: ALL_ROUTES_SOURCE,
        headers: SECURITY_HEADERS,
      },
    ]),
  images: buildCategoryImageConfig(SUPABASE.URL),
  poweredByHeader: false,
  reactCompiler: true,
  redirects: () =>
    Promise.resolve([
      {
        source: PATHS.WELL_KNOWN.CHANGE_PASSWORD,
        destination: PATHS.PROFILE.PASSWORD,
        permanent: false,
      },
    ]),
};

export default nextConfig;
