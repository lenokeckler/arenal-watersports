import { describe, expect, it } from "vitest";
import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { buildLoginSessionIdlePath } from "../buildLoginSessionIdlePath";

describe("buildLoginSessionIdlePath", () => {
  it("points to the login with the session-idle notice", () => {
    expect(buildLoginSessionIdlePath()).toBe(
      `${PATHS.ACCESS.LOGIN}?${LOGIN_NOTICE_QUERY_PARAM}=${LOGIN_NOTICE.SESSION_IDLE}`
    );
  });
});
