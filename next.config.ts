import type { NextConfig } from "next";
import { PATHS } from "./app/constants/strings/Paths.constants";

const nextConfig: NextConfig = {
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
