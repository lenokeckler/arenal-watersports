import { describe, expect, it } from "vitest";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import { buildDamageReportInput } from "../utils/buildDamageReportInput";
import { isDamageReportInput } from "../utils/isDamageReportInput";
import { resolveDamageReportFailure } from "../utils/resolveDamageReportFailure";
import { resolveInitialDraft } from "../utils/resolveInitialDraft";
import { validateDamageReport } from "../utils/validateDamageReport";
import {
  INVALID_REPORT_INPUTS,
  NEW_REPORT_SCREEN,
  PENDING_REPORT_SCREEN,
  REPORT_ID,
  REPORT_UNIT_ID,
  VALID_REPORT_INPUT,
} from "./DamageReport.constants";

describe("damage report rules", () => {
  it("starts a new report for an available machine as damaged", () => {
    expect(
      resolveInitialDraft(NEW_REPORT_SCREEN)
    ).toMatchObject({
      hits: 1,
      state: "damaged",
      unitId: REPORT_UNIT_ID,
    });
  });

  it("starts a pending report with what it already has and no state change", () => {
    expect(
      resolveInitialDraft(PENDING_REPORT_SCREEN)
    ).toMatchObject({
      hits: 3,
      state: "keep",
    });
  });

  it("asks for cause and description unless they are left for later", () => {
    const draft = resolveInitialDraft(NEW_REPORT_SCREEN);

    expect(validateDamageReport(draft, false)).toEqual({
      cause: DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR,
      description:
        DAMAGE_REPORT_COPY.DESCRIPTION_REQUIRED_ERROR,
      unit: null,
    });
    expect(
      Object.values(validateDamageReport(draft, true))
    ).toEqual([null, null, null]);
  });

  it("sends no state change when the machine stays the same", () => {
    const draft = resolveInitialDraft(
      PENDING_REPORT_SCREEN
    );

    expect(
      buildDamageReportInput(draft, REPORT_ID, false)
    ).toMatchObject({
      reportId: REPORT_ID,
      reservationId: null,
      unitStatus: null,
    });
  });

  it.each(INVALID_REPORT_INPUTS)(
    "refuses a forged request %#",
    (input) => {
      expect(isDamageReportInput(input)).toBe(false);
    }
  );

  it("accepts a well formed request", () => {
    expect(isDamageReportInput(VALID_REPORT_INPUT)).toBe(
      true
    );
  });

  it("explains each refusal of the database", () => {
    expect(
      resolveDamageReportFailure({
        code: "55000",
        message: "The unit is out on the water",
      })
    ).toBe(DAMAGE_REPORT_COPY.OUT_ON_WATER);
    expect(
      resolveDamageReportFailure({
        code: "55000",
        message: "The report is already complete",
      })
    ).toBe(DAMAGE_REPORT_COPY.ALREADY_COMPLETE);
    expect(
      resolveDamageReportFailure({
        code: "42501",
        message: "x",
      })
    ).toBe(DAMAGE_REPORT_COPY.FORBIDDEN);
    expect(
      resolveDamageReportFailure({ message: "network" })
    ).toBe(DAMAGE_REPORT_COPY.ERROR);
  });
});
