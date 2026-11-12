import { describe, expect, it } from "vitest";
import { clearStockFormErrors } from "../utils/clearStockFormErrors";

const ERRORS = {
  available: "available error",
  damaged: "damaged error",
  form: "form error",
};

describe("clearStockFormErrors", () => {
  it("removes the edited field and the form error, keeping the others", () => {
    expect(
      clearStockFormErrors(ERRORS, "available")
    ).toEqual({
      damaged: ERRORS.damaged,
    });
  });

  it("does not change the errors it receives", () => {
    clearStockFormErrors(ERRORS, "available");

    expect(ERRORS.available).toBe("available error");
  });
});
