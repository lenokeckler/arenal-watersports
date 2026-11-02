import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchUnitCount } from "../services/fetchUnitCount";
import { fetchUnits } from "../services/fetchUnits";
import { fetchUnitViewStatuses } from "../services/fetchUnitViewStatuses";
import { FAKE_CATEGORY_ID } from "./Unit.constants";
import { DEFAULT_UNIT_LIST_ROW } from "./UnitList.constants";

const UNITS_TABLE = "equipment_units";
const STATE_VIEW = "unit_current_state";
const CATEGORY_COLUMN = "category_id";
const CODE_COLUMN = "code";
const ID_COLUMN = "id";
const OCCUPIED_STATUS = "occupied";
const PAGE_RANGE = { from: 0, to: 19 };
const QUERY_ERROR = { code: "500", message: "boom" };
const METHODS = ["select", "eq", "order", "range", "in"];

const createQueryClient = (result: object) => {
  const calls: Record<string, unknown[]> = {};
  const query: Record<string, unknown> = {
    then: (resolve: (value: object) => void) =>
      resolve(result),
  };
  METHODS.forEach((method) => {
    query[method] = vi.fn((...args: unknown[]) => {
      calls[method] = args;
      return query;
    });
  });
  const from = vi.fn(() => query);
  return {
    calls,
    from,
    supabase: { from } as unknown as ServerSupabaseClient,
  };
};

describe("unit list queries", () => {
  it("counts only the units of the category without reading rows", async () => {
    const client = createQueryClient({
      count: 45,
      error: null,
    });

    expect(
      await fetchUnitCount(
        client.supabase,
        FAKE_CATEGORY_ID
      )
    ).toBe(45);
    expect(client.from).toHaveBeenCalledWith(UNITS_TABLE);
    expect(client.calls.select?.[1]).toEqual({
      count: "exact",
      head: true,
    });
    expect(client.calls.eq).toEqual([
      CATEGORY_COLUMN,
      FAKE_CATEGORY_ID,
    ]);
  });

  it("reads the page of the category ordered by code", async () => {
    const client = createQueryClient({
      data: [DEFAULT_UNIT_LIST_ROW],
      error: null,
    });

    const rows = await fetchUnits(
      client.supabase,
      FAKE_CATEGORY_ID,
      PAGE_RANGE
    );

    expect(rows).toEqual([DEFAULT_UNIT_LIST_ROW]);
    expect(client.calls.eq).toEqual([
      CATEGORY_COLUMN,
      FAKE_CATEGORY_ID,
    ]);
    expect(client.calls.order).toEqual([
      CODE_COLUMN,
      { ascending: true },
    ]);
    expect(client.calls.range).toEqual([
      PAGE_RANGE.from,
      PAGE_RANGE.to,
    ]);
  });

  it("reads the effective status of every id it is given in one query", async () => {
    const unitIds = [DEFAULT_UNIT_LIST_ROW.id, "other-id"];
    const client = createQueryClient({
      data: [
        {
          id: unitIds[0],
          effective_status: OCCUPIED_STATUS,
        },
        { id: null, effective_status: OCCUPIED_STATUS },
      ],
      error: null,
    });

    const viewStatusById = await fetchUnitViewStatuses(
      client.supabase,
      unitIds
    );

    expect(client.from).toHaveBeenCalledTimes(1);
    expect(client.from).toHaveBeenCalledWith(STATE_VIEW);
    expect(client.calls.in).toEqual([ID_COLUMN, unitIds]);
    expect([...viewStatusById]).toEqual([
      [unitIds[0], OCCUPIED_STATUS],
    ]);
  });

  it.each([
    [
      "count",
      (supabase: ServerSupabaseClient) =>
        fetchUnitCount(supabase, FAKE_CATEGORY_ID),
    ],
    [
      "page",
      (supabase: ServerSupabaseClient) =>
        fetchUnits(supabase, FAKE_CATEGORY_ID, PAGE_RANGE),
    ],
    [
      "view",
      (supabase: ServerSupabaseClient) =>
        fetchUnitViewStatuses(supabase, [ID_COLUMN]),
    ],
  ])(
    "throws when the %s read fails",
    async (_name, read) => {
      const client = createQueryClient({
        data: null,
        error: QUERY_ERROR,
      });

      await expect(read(client.supabase)).rejects.toThrow(
        SupabaseQueryError
      );
    }
  );
});
