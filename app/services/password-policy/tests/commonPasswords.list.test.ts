import { describe, expect, it } from "vitest";
import { PASSWORD_LENGTH } from "@/app/constants";
import { hasDigit } from "@/app/utils/password/hasDigit";
import { hasLowercase } from "@/app/utils/password/hasLowercase";
import { hasSymbol } from "@/app/utils/password/hasSymbol";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import commonPasswords from "../data/commonPasswords.json";
import { ASVS_MINIMUM_COMMON_PASSWORDS } from "./commonPassword.constants";

const isShapedLikeThePasswordRules = (
  password: string
): boolean =>
  password.length >= PASSWORD_LENGTH.MIN &&
  !isPasswordTooLong(password) &&
  hasLowercase(password) &&
  hasDigit(password) &&
  hasSymbol(password);

describe("common password list", () => {
  it("holds at least the ASVS minimum of common passwords", () => {
    expect(commonPasswords.length).toBeGreaterThanOrEqual(
      ASVS_MINIMUM_COMMON_PASSWORDS
    );
  });

  it("stores every entry in lowercase", () => {
    expect(
      commonPasswords.filter(
        (password) => password !== password.toLowerCase()
      )
    ).toEqual([]);
  });

  it("stores every entry once", () => {
    expect(new Set(commonPasswords).size).toBe(
      commonPasswords.length
    );
  });

  it("keeps only passwords the rules would otherwise accept", () => {
    expect(
      commonPasswords.filter(
        (password) =>
          !isShapedLikeThePasswordRules(password)
      )
    ).toEqual([]);
  });
});
