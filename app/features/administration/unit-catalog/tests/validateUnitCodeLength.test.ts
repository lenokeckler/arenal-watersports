import { describe, expect, it } from "vitest";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { findUnitCodeError } from "../utils/findUnitCodeError";
import {
  CODE_LENGTH_AT_LIMIT,
  CODE_LENGTH_OVER_LIMIT,
} from "./UnitCodeLength.constants";

describe("findUnitCodeError length boundary", () => {
  it("accepts a code of the documented maximum length", () => {
    expect(
      findUnitCodeError("A".repeat(CODE_LENGTH_AT_LIMIT))
    ).toBeUndefined();
  });

  it("rejects a code one character over the documented maximum", () => {
    expect(
      findUnitCodeError("A".repeat(CODE_LENGTH_OVER_LIMIT))
    ).toBe(UNIT_FORM_ERROR_COPY.CODE_TOO_LONG);
  });
});
