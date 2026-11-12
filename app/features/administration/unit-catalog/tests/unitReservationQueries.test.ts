import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { fetchUnitReservationCount } from "../services/fetchUnitReservationCount";
import { fetchUnitReservations } from "../services/fetchUnitReservations";
import { FAKE_UNIT_ID } from "./Unit.constants";
import { DEFAULT_UNIT_RESERVATION_ROW } from "./UnitReservationHistory.constants";

const RESERVATIONS_TABLE = "reservations";
const UNIT_COLUMN = "reservation_items.unit_id";
const INNER_ITEMS_EMBED = "reservation_items!inner";
const START_COLUMN = "starts_at";
const ID_COLUMN = "id";
const PAGE_RANGE = { from: 20, to: 39 };
const QUERY_ERROR = { code: "500", message: "boom" };
const COUNT_TOTAL = 45;
const METHODS = ["select", "eq", "order", "range"];

const createQueryClient = (result: object) => {
  const calls: Record<string, unknown[][]> = {};
  const query: Record<string, unknown> = {
    then: (resolve: (value: object) => void) =>
      resolve(result),
  };
  METHODS.forEach((method) => {
    query[method] = vi.fn((...args: unknown[]) => {
      calls[method] = [...(calls[method] ?? []), args];
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

describe("unit reservation queries", () => {
  it("counts only the reservations that include the unit without reading rows", async () => {
    const client = createQueryClient({
      count: COUNT_TOTAL,
      error: null,
    });

    expect(
      await fetchUnitReservationCount(
        client.supabase,
        FAKE_UNIT_ID
      )
    ).toBe(COUNT_TOTAL);
    expect(client.from).toHaveBeenCalledWith(
      RESERVATIONS_TABLE
    );
    expect(client.calls.select?.[0]?.[1]).toEqual({
      count: "exact",
      head: true,
    });
    expect(client.calls.select?.[0]?.[0]).toContain(
      INNER_ITEMS_EMBED
    );
    expect(client.calls.eq?.[0]).toEqual([
      UNIT_COLUMN,
      FAKE_UNIT_ID,
    ]);
  });

  it("reads the page of the unit with the latest start first, then by id", async () => {
    const client = createQueryClient({
      data: [DEFAULT_UNIT_RESERVATION_ROW],
      error: null,
    });

    const rows = await fetchUnitReservations(
      client.supabase,
      FAKE_UNIT_ID,
      PAGE_RANGE
    );

    expect(rows).toEqual([DEFAULT_UNIT_RESERVATION_ROW]);
    expect(client.calls.select?.[0]?.[0]).toContain(
      INNER_ITEMS_EMBED
    );
    expect(client.calls.eq?.[0]).toEqual([
      UNIT_COLUMN,
      FAKE_UNIT_ID,
    ]);
    expect(client.calls.order).toEqual([
      [START_COLUMN, { ascending: false }],
      [ID_COLUMN, { ascending: true }],
    ]);
    expect(client.calls.range?.[0]).toEqual([
      PAGE_RANGE.from,
      PAGE_RANGE.to,
    ]);
  });

  it.each([
    [
      "count",
      (supabase: ServerSupabaseClient) =>
        fetchUnitReservationCount(supabase, FAKE_UNIT_ID),
    ],
    [
      "page",
      (supabase: ServerSupabaseClient) =>
        fetchUnitReservations(
          supabase,
          FAKE_UNIT_ID,
          PAGE_RANGE
        ),
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
