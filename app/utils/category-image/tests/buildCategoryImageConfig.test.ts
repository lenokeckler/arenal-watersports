import { describe, expect, it } from "vitest";
import { buildCategoryImageConfig } from "../buildCategoryImageConfig";
import {
  EXPECTED_PUBLIC_PATHNAME,
  HOSTED_SUPABASE_URL,
  LOCAL_SUPABASE_URL,
  UNPARSEABLE_SUPABASE_URL,
} from "./categoryImage.constants";

describe("buildCategoryImageConfig", () => {
  it("allows only the public bucket of the hosted project", () => {
    expect(
      buildCategoryImageConfig(HOSTED_SUPABASE_URL)
    ).toEqual({
      dangerouslyAllowLocalIP: false,
      remotePatterns: [
        {
          hostname: new URL(HOSTED_SUPABASE_URL).hostname,
          pathname: EXPECTED_PUBLIC_PATHNAME,
          port: "",
          protocol: "https",
        },
      ],
    });
  });

  it("allows local addresses only for the local stack", () => {
    expect(
      buildCategoryImageConfig(LOCAL_SUPABASE_URL)
    ).toEqual({
      dangerouslyAllowLocalIP: true,
      remotePatterns: [
        {
          hostname: new URL(LOCAL_SUPABASE_URL).hostname,
          pathname: EXPECTED_PUBLIC_PATHNAME,
          port: new URL(LOCAL_SUPABASE_URL).port,
          protocol: "http",
        },
      ],
    });
  });

  it("allows no remote image when the url is not valid", () => {
    expect(
      buildCategoryImageConfig(UNPARSEABLE_SUPABASE_URL)
    ).toEqual({ remotePatterns: [] });
  });
});
