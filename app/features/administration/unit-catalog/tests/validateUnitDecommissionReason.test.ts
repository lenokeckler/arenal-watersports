import { describe, expect, it } from "vitest";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";
import { validateUnitDecommissionReason } from "../utils/validateUnitDecommissionReason";

const MAX_REASON = "R".repeat(
  UNIT_FORM_LIMITS.REASON_MAX_LENGTH
);

describe("validateUnitDecommissionReason", () => {
  it.each([
    {
      reason: "",
      expected: UNIT_FORM_ERROR_COPY.REASON_REQUIRED,
    },
    {
      reason: "   ",
      expected: UNIT_FORM_ERROR_COPY.REASON_REQUIRED,
    },
    { reason: "Motor fundido", expected: undefined },
    { reason: ` ${MAX_REASON} `, expected: undefined },
    {
      reason: `${MAX_REASON}R`,
      expected: UNIT_FORM_ERROR_COPY.REASON_TOO_LONG,
    },
  ])(
    "judges the reason of $reason.length characters",
    ({ reason, expected }) => {
      expect(validateUnitDecommissionReason(reason)).toBe(
        expected
      );
    }
  );
});
