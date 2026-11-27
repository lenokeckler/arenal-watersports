import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { countConfigurationErrors } from "../utils/countConfigurationErrors";
import {
  buildConfigurationErrors,
  FAKE_FIELD_ERROR,
  NO_CONFIGURATION_ERRORS,
} from "./CategoryConfigureSave.constants";

describe("countConfigurationErrors", () => {
  it("counts zero when no section has an error", () => {
    expect(
      countConfigurationErrors(NO_CONFIGURATION_ERRORS)
    ).toBe(LENGTH.ZERO);
  });

  it("adds the errors of every section", () => {
    expect(
      countConfigurationErrors(
        buildConfigurationErrors({
          behavior: {
            defaultDurationMinutes: FAKE_FIELD_ERROR,
            lowFuelLines: FAKE_FIELD_ERROR,
          },
          deposit: { depositUsd: FAKE_FIELD_ERROR },
        })
      )
    ).toBe(LENGTH.THREE);
  });
});
