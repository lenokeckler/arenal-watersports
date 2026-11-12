import { createOperationsClient } from "@/app/components/dispatch-board/tests/getPendingDispatchReservations.test-utils";
import { describe, expect, it, vi } from "vitest";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { DAMAGE_REPORTS_PAGINATION } from "../constants/DamageReports.constants";
import { getUnitDamageReports } from "../services/getUnitDamageReports";
import { getDamageReportsHref } from "../utils/getDamageReportsHref";
import { getDamageReportsPage } from "../utils/getDamageReportsPage";
import { getDamageReportsUnitId } from "../utils/getDamageReportsUnitId";
import { getReportDetailText } from "../utils/getReportDetailText";
import {
  PAGE_CASES,
  REPORT_ENTRY,
  REPORT_DETAIL_TEXT,
  REPORT_ROW,
  UNIT,
  UNIT_ID,
  UNIT_ROW,
} from "./DamageReports.constants";

const queueReads = (unit: unknown, reports: unknown) => {
  const { client } = createOperationsClient(true, true);
  const maybeSingle = vi
    .fn()
    .mockResolvedValue({ data: unit, error: null });
  const unitEq = vi.fn().mockReturnValue({ maybeSingle });
  const unitSelect = vi
    .fn()
    .mockReturnValue({ eq: unitEq });
  const range = vi
    .fn()
    .mockResolvedValue({ data: reports, error: null });
  const order = vi.fn().mockReturnValue({ range });
  const reportsEq = vi.fn().mockReturnValue({ order });
  const reportsSelect = vi
    .fn()
    .mockReturnValue({ eq: reportsEq });
  const from = vi.fn((table: string) =>
    table === "equipment_units"
      ? { select: unitSelect }
      : { select: reportsSelect }
  );
  Object.assign(client, { from });

  return { from, order, range, reportsEq, unitEq };
};

describe("getUnitDamageReports", () => {
  it("reads the unit and its reports, the latest first", async () => {
    const { order, range, reportsEq, unitEq } = queueReads(
      UNIT_ROW,
      [REPORT_ROW]
    );

    const page = await getUnitDamageReports(UNIT_ID, 1);

    expect(unitEq).toHaveBeenCalledWith("id", UNIT_ID);
    expect(reportsEq).toHaveBeenCalledWith(
      "unit_id",
      UNIT_ID
    );
    expect(order).toHaveBeenCalledWith("created_at", {
      ascending: false,
    });
    expect(range).toHaveBeenCalledWith(
      0,
      DAMAGE_REPORTS_PAGINATION.PAGE_SIZE
    );
    expect(page).toEqual({
      entries: [REPORT_ENTRY],
      hasNextPage: false,
      page: 1,
      unit: UNIT,
    });
  });

  it("asks for the rows of the page that was requested", async () => {
    const { range } = queueReads(UNIT_ROW, []);

    await getUnitDamageReports(UNIT_ID, 3);

    expect(range).toHaveBeenCalledWith(
      2 * DAMAGE_REPORTS_PAGINATION.PAGE_SIZE,
      3 * DAMAGE_REPORTS_PAGINATION.PAGE_SIZE
    );
  });

  it("knows there is a next page when one more row comes back", async () => {
    queueReads(
      UNIT_ROW,
      Array.from(
        { length: DAMAGE_REPORTS_PAGINATION.PAGE_SIZE + 1 },
        () => REPORT_ROW
      )
    );

    const page = await getUnitDamageReports(UNIT_ID, 1);

    expect(page.hasNextPage).toBe(true);
    expect(page.entries).toHaveLength(
      DAMAGE_REPORTS_PAGINATION.PAGE_SIZE
    );
  });

  it("answers an empty list for a unit without reports", async () => {
    queueReads(UNIT_ROW, null);

    await expect(
      getUnitDamageReports(UNIT_ID, 1)
    ).resolves.toEqual({
      entries: [],
      hasNextPage: false,
      page: 1,
      unit: UNIT,
    });
  });

  it("answers no unit when it does not exist", async () => {
    const { range } = queueReads(null, []);

    const page = await getUnitDamageReports(UNIT_ID, 1);

    expect(page.unit).toBeNull();
    expect(range).not.toHaveBeenCalled();
  });

  it("answers no unit for an id that is not a uuid without reading", async () => {
    const { from } = queueReads(UNIT_ROW, []);

    const page = await getUnitDamageReports(
      "not-a-uuid",
      1
    );

    expect(page.unit).toBeNull();
    expect(from).not.toHaveBeenCalled();
  });

  it("refuses a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getUnitDamageReports(UNIT_ID, 1)
    ).rejects.toBeInstanceOf(OperationsAccessError);
  });
});

describe("damage reports utils", () => {
  it.each(PAGE_CASES)(
    "reads %j as page $expected",
    ({ expected, param }) => {
      expect(getDamageReportsPage(param)).toBe(expected);
    }
  );

  it("reads the unit of the query and ignores anything else", () => {
    expect(getDamageReportsUnitId(UNIT_ID)).toBe(UNIT_ID);
    expect(getDamageReportsUnitId("")).toBeNull();
    expect(getDamageReportsUnitId(undefined)).toBeNull();
    expect(getDamageReportsUnitId([UNIT_ID])).toBeNull();
  });

  it("builds the link of a page of a unit", () => {
    expect(getDamageReportsHref(UNIT_ID, 2)).toBe(
      `/operations/damage-reports?unidad=${UNIT_ID}&pagina=2`
    );
  });

  it("writes the date and the impacts of a report", () => {
    expect(getReportDetailText(REPORT_ENTRY)).toBe(
      REPORT_DETAIL_TEXT
    );
  });
});
