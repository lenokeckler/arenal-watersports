import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { isCommonPassword } from "../isCommonPassword";
import {
  LISTED_PASSWORD,
  LISTED_PASSWORD_IN_MIXED_CASE,
  UNLISTED_PASSWORD,
} from "./commonPassword.constants";

describe("isCommonPassword", () => {
  it("finds a password from the list", () => {
    expect(isCommonPassword(LISTED_PASSWORD)).toBe(true);
  });

  it("finds a listed password whatever its letter case", () => {
    expect(
      isCommonPassword(LISTED_PASSWORD_IN_MIXED_CASE)
    ).toBe(true);
  });

  it("lets through a password that is not on the list", () => {
    expect(isCommonPassword(UNLISTED_PASSWORD)).toBe(false);
  });

  it("does not treat an empty password as common", () => {
    expect(isCommonPassword(STRING.Empty)).toBe(false);
  });
});
