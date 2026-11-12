import { describe, expect, it } from "vitest";
import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { buildLoginSignedOutPath } from "../buildLoginSignedOutPath";

describe("buildLoginSignedOutPath", () => {
  it("points to the login with the signed-out notice", () => {
    expect(buildLoginSignedOutPath()).toBe(
      `${PATHS.ACCESS.LOGIN}?${LOGIN_NOTICE_QUERY_PARAM}=${LOGIN_NOTICE.SIGNED_OUT}`
    );
  });
});
