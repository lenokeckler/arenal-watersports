import { describe, expect, it } from "vitest";
import { resolveFieldAriaAttributes } from "../utils/resolveFieldAriaAttributes";
import {
  EXPECTED_DESCRIBEDBY,
  FIELD_ID,
} from "./FieldFactory.constants";

describe("resolveFieldAriaAttributes", () => {
  it("marks the field invalid and points at its error id when it has an error", () => {
    expect(
      resolveFieldAriaAttributes(FIELD_ID, true)
    ).toEqual({
      "aria-invalid": true,
      "aria-describedby": EXPECTED_DESCRIBEDBY,
    });
  });

  it("returns no attributes when the field has no error", () => {
    expect(
      resolveFieldAriaAttributes(FIELD_ID, false)
    ).toEqual({});
  });
});
