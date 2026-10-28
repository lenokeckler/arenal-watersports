import { describe, expect, it } from "vitest";
import { buildLoginSignedOutPath } from "../utils/buildLoginSignedOutPath";
import { SIGNED_OUT_LOGIN_PATH } from "./useLogoutViewModel.constants";

describe("buildLoginSignedOutPath", () => {
  it("points to the login with the signed-out notice", () => {
    expect(buildLoginSignedOutPath()).toBe(
      SIGNED_OUT_LOGIN_PATH
    );
  });
});
