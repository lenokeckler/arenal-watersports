import { describe, expect, it } from "vitest";
import { clearCategoryAlertFieldErrors } from "../utils/clearCategoryAlertFieldErrors";

const ERRORS = {
  minQuantityText: "min",
  expiryDaysText: "days",
};

describe("clearCategoryAlertFieldErrors", () => {
  it("removes only the given fields", () => {
    expect(
      clearCategoryAlertFieldErrors(ERRORS, [
        "minQuantityText",
      ])
    ).toEqual({ expiryDaysText: ERRORS.expiryDaysText });
  });

  it("returns the same object when none of the fields has an error", () => {
    const errors = {
      expiryDaysText: ERRORS.expiryDaysText,
    };

    expect(
      clearCategoryAlertFieldErrors(errors, [
        "minQuantityText",
      ])
    ).toBe(errors);
  });
});
