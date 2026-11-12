import { describe, expect, it } from "vitest";
import { readErrorCode } from "../readErrorCode";
import {
  CAUSE_CODE,
  OWN_CODE,
} from "./readErrorCode.constants";
import { ERROR_WITH_THROWING_CODE } from "./serverErrorProbes.constants";

describe("readErrorCode", () => {
  it("reads the code of the error itself", () => {
    expect(
      readErrorCode(
        Object.assign(new Error(), { code: OWN_CODE })
      )
    ).toBe(OWN_CODE);
  });

  it("reads the code of the cause", () => {
    const error = new Error("", {
      cause: { code: CAUSE_CODE },
    });

    expect(readErrorCode(error)).toBe(CAUSE_CODE);
  });

  it("prefers its own code over the cause code", () => {
    const error = Object.assign(
      new Error("", { cause: { code: CAUSE_CODE } }),
      { code: OWN_CODE }
    );

    expect(readErrorCode(error)).toBe(OWN_CODE);
  });

  it("ignores a code that is not a string", () => {
    expect(
      readErrorCode(
        Object.assign(new Error(), { code: 500 })
      )
    ).toBeNull();
  });

  it("returns null when reading the code throws", () => {
    expect(
      readErrorCode(ERROR_WITH_THROWING_CODE)
    ).toBeNull();
  });
});
