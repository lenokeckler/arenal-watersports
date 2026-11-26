import { describe, expect, it } from "vitest";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import { buildMaintenanceJobForm } from "../utils/buildMaintenanceJobForm";
import { getCostaRicaToday } from "../utils/getCostaRicaToday";
import {
  EMPTY_JOB_DRAFT,
  JOB_TODAY,
  JOB_UNITS,
} from "./MaintenanceJob.constants";

const build = (change: Partial<typeof EMPTY_JOB_DRAFT>) =>
  buildMaintenanceJobForm(
    { ...EMPTY_JOB_DRAFT, ...change },
    JOB_UNITS,
    JOB_TODAY
  );

describe("buildMaintenanceJobForm", () => {
  it("builds the job of a work that cost nothing with the cost empty", () => {
    const { errors, input } = build({});

    expect(
      Object.values(errors).every((e) => e === null)
    ).toBe(true);
    expect(input).toMatchObject({
      costAmount: null,
      costCurrency: null,
      oilInterval: null,
      workType: "tire_change",
    });
  });

  it("keeps the cost with its currency and the external mark apart", () => {
    const { input } = build({
      costAmount: "35000,50",
      costCurrency: "CRC",
      isExternal: true,
    });

    expect(input).toMatchObject({
      costAmount: 35000.5,
      costCurrency: "CRC",
      isExternal: true,
    });
  });

  it("asks for the currency when a cost is typed and for the cost when a currency is chosen", () => {
    expect(
      build({ costAmount: "100" }).errors.currency
    ).toBe(MAINTENANCE_JOB_COPY.ERROR_CURRENCY);
    expect(build({ costCurrency: "USD" }).errors.cost).toBe(
      MAINTENANCE_JOB_COPY.ERROR_COST
    );
  });

  it("refuses a cost that is not an amount", () => {
    expect(
      build({ costAmount: "abc", costCurrency: "CRC" })
        .errors.cost
    ).toBe(MAINTENANCE_JOB_COPY.ERROR_COST);
  });

  it("needs a description for another type of work", () => {
    expect(
      build({ workType: "other" }).errors.description
    ).toBe(MAINTENANCE_JOB_COPY.ERROR_DESCRIPTION);
    expect(
      build({ description: "Welded", workType: "other" })
        .input
    ).not.toBeNull();
  });

  it("asks for the oil change interval only on an oil change and above zero", () => {
    expect(
      build({ workType: "oil_change" }).errors.interval
    ).toBe(MAINTENANCE_JOB_COPY.ERROR_INTERVAL_INVALID);
    expect(
      build({ oilInterval: "0", workType: "oil_change" })
        .errors.interval
    ).toBe(MAINTENANCE_JOB_COPY.ERROR_INTERVAL_INVALID);
    expect(
      build({ oilInterval: "150", workType: "oil_change" })
        .input?.oilInterval
    ).toBe(150);
    expect(
      build({ oilInterval: "150" }).input?.oilInterval
    ).toBeNull();
  });

  it("refuses a future date, an unknown unit and a missing type", () => {
    const { errors } = build({
      performedAt: "2026-09-08",
      unitId: "",
      workType: "",
    });

    expect(errors.date).toBe(
      MAINTENANCE_JOB_COPY.ERROR_DATE
    );
    expect(errors.unit).toBe(
      MAINTENANCE_JOB_COPY.ERROR_UNIT
    );
    expect(errors.workType).toBe(
      MAINTENANCE_JOB_COPY.ERROR_WORK_TYPE
    );
  });
});

describe("getCostaRicaToday", () => {
  it("answers the date of Costa Rica, six hours behind UTC", () => {
    expect(
      getCostaRicaToday(
        new Date("2026-09-08T03:00:00.000Z")
      )
    ).toBe("2026-09-07");
    expect(
      getCostaRicaToday(
        new Date("2026-09-07T12:00:00.000Z")
      )
    ).toBe("2026-09-07");
  });
});
