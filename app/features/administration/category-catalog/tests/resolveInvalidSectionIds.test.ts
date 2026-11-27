import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_SECTION_ID as SECTION } from "../constants/CategoryConfigureSectionId.constants";
import { resolveInvalidSectionIds } from "../utils/resolveInvalidSectionIds";
import {
  buildConfigurationErrors,
  FAKE_FIELD_ERROR,
  NO_CONFIGURATION_ERRORS,
} from "./CategoryConfigureSave.constants";

const DEPOSIT_ERRORS = buildConfigurationErrors({
  deposit: { depositCrc: FAKE_FIELD_ERROR },
});
const ALERT_ERRORS = buildConfigurationErrors({
  alerts: { expiryDaysText: FAKE_FIELD_ERROR },
});

describe("resolveInvalidSectionIds", () => {
  it.each([
    {
      scenario: "no errors",
      errors: NO_CONFIGURATION_ERRORS,
      expected: [],
    },
    {
      scenario: "a duration error",
      errors: buildConfigurationErrors({
        behavior: {
          defaultDurationMinutes: FAKE_FIELD_ERROR,
        },
      }),
      expected: [SECTION.RESERVATIONS],
    },
    {
      scenario: "a low fuel error",
      errors: buildConfigurationErrors({
        behavior: { lowFuelLines: FAKE_FIELD_ERROR },
      }),
      expected: [SECTION.TRAITS],
    },
    {
      scenario: "a deposit error",
      errors: DEPOSIT_ERRORS,
      expected: [SECTION.DEPOSIT],
    },
    {
      scenario: "an alerts error",
      errors: ALERT_ERRORS,
      expected: [SECTION.ALERTS],
    },
    {
      scenario: "errors in every section, in screen order",
      errors: buildConfigurationErrors({
        behavior: {
          defaultDurationMinutes: FAKE_FIELD_ERROR,
          lowFuelLines: FAKE_FIELD_ERROR,
        },
        deposit: DEPOSIT_ERRORS.deposit,
        alerts: ALERT_ERRORS.alerts,
      }),
      expected: [
        SECTION.RESERVATIONS,
        SECTION.DEPOSIT,
        SECTION.ALERTS,
        SECTION.TRAITS,
      ],
    },
  ])(
    "resolves the sections to open for $scenario",
    ({ errors, expected }) => {
      expect(resolveInvalidSectionIds(errors)).toEqual(
        expected
      );
    }
  );
});
