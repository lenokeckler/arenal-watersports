import { describe, expect, it } from "vitest";
import { validateDamageReportInput } from "./validateDamageReportInput";

const VALID_INPUT = {
  unitId: "unit-1",
  cause: "collision" as const,
  description: "La unidad sufrió un choque.",
  impactDelta: 2,
};

describe("validateDamageReportInput", () => {
  it("accepts a valid damage report", () => {
    expect(() =>
      validateDamageReportInput(VALID_INPUT)
    ).not.toThrow();
  });

  it("rejects a report without a unit", () => {
    expect(() =>
      validateDamageReportInput({
        ...VALID_INPUT,
        unitId: "",
      })
    ).toThrow("A unit must be selected");
  });

  it("rejects a report without a description", () => {
    expect(() =>
      validateDamageReportInput({
        ...VALID_INPUT,
        description: "",
      })
    ).toThrow("Description is required");
  });

  it("rejects a negative impact increase", () => {
    expect(() =>
      validateDamageReportInput({
        ...VALID_INPUT,
        impactDelta: -1,
      })
    ).toThrow(
      "Impact increase must be a non-negative integer"
    );
  });

  it("rejects a non-integer impact increase", () => {
    expect(() =>
      validateDamageReportInput({
        ...VALID_INPUT,
        impactDelta: 1.5,
      })
    ).toThrow(
      "Impact increase must be a non-negative integer"
    );
  });
});
