import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { fetchCategoryIdsWithRecords } from "../services/fetchCategoryIdsWithRecords";

const UNITS_TABLE = "equipment_units";
const STOCK_TABLE = "equipment_stock";
const SINGLE_ROW_LIMIT = 1;
const READ_ERROR = { message: "read failed" };

interface RecordsByTable {
  [UNITS_TABLE]: string[];
  [STOCK_TABLE]: string[];
}

const buildSupabase = (
  recordsByTable: RecordsByTable,
  error: typeof READ_ERROR | null = null
) => {
  const limit = vi.fn();
  const from = vi.fn((table: keyof RecordsByTable) => ({
    select: () => ({
      eq: (_column: string, categoryId: string) => ({
        limit: (rowLimit: number) => {
          limit(table, categoryId, rowLimit);
          const hasRecord =
            recordsByTable[table].includes(categoryId);
          return Promise.resolve({
            data: hasRecord
              ? [{ category_id: categoryId }]
              : [],
            error,
          });
        },
      }),
    }),
  }));
  return {
    client: { from } as unknown as ServerSupabaseClient,
    from,
    limit,
  };
};

describe("fetchCategoryIdsWithRecords", () => {
  it("does not query anything when the page has no categories", async () => {
    const { client, from } = buildSupabase({
      [UNITS_TABLE]: [],
      [STOCK_TABLE]: [],
    });

    const result = await fetchCategoryIdsWithRecords(
      client,
      []
    );

    expect(result.size).toBe(0);
    expect(from).not.toHaveBeenCalled();
  });

  it("asks each table for at most one row per category so a response cap can never hide a record", async () => {
    const { client, limit } = buildSupabase({
      [UNITS_TABLE]: ["a"],
      [STOCK_TABLE]: [],
    });

    await fetchCategoryIdsWithRecords(client, ["a", "b"]);

    expect(limit).toHaveBeenCalledTimes(4);
    expect(limit).toHaveBeenCalledWith(
      UNITS_TABLE,
      "a",
      SINGLE_ROW_LIMIT
    );
    expect(limit).toHaveBeenCalledWith(
      STOCK_TABLE,
      "b",
      SINGLE_ROW_LIMIT
    );
  });

  it("keeps the categories that have a unit or a stock row and drops the rest", async () => {
    const { client } = buildSupabase({
      [UNITS_TABLE]: ["a"],
      [STOCK_TABLE]: ["b"],
    });

    const result = await fetchCategoryIdsWithRecords(
      client,
      ["a", "b", "c"]
    );

    expect([...result].sort()).toEqual(["a", "b"]);
  });

  it("throws when a read fails", async () => {
    const { client } = buildSupabase(
      { [UNITS_TABLE]: [], [STOCK_TABLE]: [] },
      READ_ERROR
    );

    await expect(
      fetchCategoryIdsWithRecords(client, ["a"])
    ).rejects.toThrow();
  });
});
