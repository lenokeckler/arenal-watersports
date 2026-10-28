import { describe, expect, it } from "vitest";
import { resolveFieldAriaAttributes } from "../utils/resolveFieldAriaAttributes";
import {
  ERROR_AND_EXTRA_DESCRIBEDBY,
  EXPECTED_DESCRIBEDBY,
  EXTRA_DESCRIBEDBY_ID,
  FIELD_ID,
} from "./FieldFactory.constants";

describe("resolveFieldAriaAttributes", () => {
  it("marks the field invalid and points at its error id when the error text is rendered", () => {
    expect(
      resolveFieldAriaAttributes(FIELD_ID, true, true)
    ).toEqual({
      "aria-invalid": true,
      "aria-describedby": EXPECTED_DESCRIBEDBY,
    });
  });

  it("marks the field invalid without describedby when the error text is hidden", () => {
    expect(
      resolveFieldAriaAttributes(FIELD_ID, true, false)
    ).toEqual({ "aria-invalid": true });
  });

  it("returns no attributes when the field has no error", () => {
    expect(
      resolveFieldAriaAttributes(FIELD_ID, false, false)
    ).toEqual({});
  });

  it("appends the extra id after the error id", () => {
    expect(
      resolveFieldAriaAttributes(
        FIELD_ID,
        true,
        true,
        EXTRA_DESCRIBEDBY_ID
      )
    ).toEqual({
      "aria-invalid": true,
      "aria-describedby": ERROR_AND_EXTRA_DESCRIBEDBY,
    });
  });

  it("describes the field with the extra id alone when there is no error text", () => {
    expect(
      resolveFieldAriaAttributes(
        FIELD_ID,
        false,
        false,
        EXTRA_DESCRIBEDBY_ID
      )
    ).toEqual({ "aria-describedby": EXTRA_DESCRIBEDBY_ID });
  });
});
