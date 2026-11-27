import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getPriceLookupCatalog } from "../services/getPriceLookupCatalog";
import {
  ACTIVE_STATUS,
  CATEGORIES_TABLE,
  COMBOS_TABLE,
  EXTRAS_TABLE,
  FOREIGN_COMBO_ROW,
  JET_SKI_TARIFF,
  JET_SKI_TARIFF_ROW,
  MONEY_TABLES,
  NATIONAL_COMBO,
  NATIONAL_COMBO_ROW,
  PARRILLA_EXTRA,
  PARRILLA_ROW,
  STATUS_COLUMN,
} from "./PriceLookup.constants";
import { buildPostgrestError } from "./buildPostgrestError";

interface TableResult {
  data: object[] | null;
  error: ReturnType<typeof buildPostgrestError> | null;
}

const tableResults = new Map<string, TableResult>();
const mockEq = vi.fn(
  (_table: string, _column: string, _value: string) =>
    undefined
);
const mockFrom = vi.fn((table: string) => ({
  select: (_columns: string) => ({
    eq: (column: string, value: string) => {
      mockEq(table, column, value);
      return {
        order: () => ({
          order: () =>
            Promise.resolve(tableResults.get(table)),
        }),
      };
    },
  }),
}));

vi.mock(
  "@/app/services/operations/getOperationsSupabaseClient",
  () => ({
    getOperationsSupabaseClient: vi.fn(),
  })
);

const setCatalogRows = (): void => {
  tableResults.set(CATEGORIES_TABLE, {
    data: [JET_SKI_TARIFF_ROW],
    error: null,
  });
  tableResults.set(EXTRAS_TABLE, {
    data: [PARRILLA_ROW],
    error: null,
  });
  tableResults.set(COMBOS_TABLE, {
    data: [NATIONAL_COMBO_ROW, FOREIGN_COMBO_ROW],
    error: null,
  });
};

describe("getPriceLookupCatalog", () => {
  beforeEach(() => {
    tableResults.clear();
    mockFrom.mockClear();
    mockEq.mockClear();
    vi.mocked(
      getOperationsSupabaseClient
    ).mockResolvedValue({
      from: mockFrom,
    } as unknown as Awaited<
      ReturnType<typeof getOperationsSupabaseClient>
    >);
  });

  it("reads the tariffs, the extras and the combos", async () => {
    setCatalogRows();

    const catalog = await getPriceLookupCatalog();

    expect(catalog.tariffs).toEqual([JET_SKI_TARIFF]);
    expect(catalog.extras).toEqual([PARRILLA_EXTRA]);
    expect(catalog.combos).toContainEqual(NATIONAL_COMBO);
    expect(catalog.combos).toHaveLength(2);
  });

  it("reads only active categories, extras and combos", async () => {
    setCatalogRows();

    await getPriceLookupCatalog();

    [CATEGORIES_TABLE, EXTRAS_TABLE, COMBOS_TABLE].forEach(
      (table) => {
        expect(mockEq).toHaveBeenCalledWith(
          table,
          STATUS_COLUMN,
          ACTIVE_STATUS
        );
      }
    );
  });

  it("never reads a table that holds money movements", async () => {
    setCatalogRows();

    await getPriceLookupCatalog();

    const readTables = mockFrom.mock.calls.map(
      ([table]) => table
    );

    expect(readTables.sort()).toEqual(
      [CATEGORIES_TABLE, COMBOS_TABLE, EXTRAS_TABLE].sort()
    );
    MONEY_TABLES.forEach((table) => {
      expect(readTables).not.toContain(table);
    });
  });

  it("returns empty lists when nothing is active", async () => {
    [CATEGORIES_TABLE, EXTRAS_TABLE, COMBOS_TABLE].forEach(
      (table) =>
        tableResults.set(table, { data: null, error: null })
    );

    expect(await getPriceLookupCatalog()).toEqual({
      combos: [],
      extras: [],
      tariffs: [],
    });
  });

  it.each([CATEGORIES_TABLE, EXTRAS_TABLE, COMBOS_TABLE])(
    "throws when reading %s fails",
    async (failingTable) => {
      setCatalogRows();
      tableResults.set(failingTable, {
        data: null,
        error: buildPostgrestError(
          POSTGRES_ERROR_CODE.RAISE_EXCEPTION
        ),
      });

      await expect(
        getPriceLookupCatalog()
      ).rejects.toBeInstanceOf(SupabaseQueryError);
    }
  );

  it("does not read anything when the access check refuses", async () => {
    const refusal = new Error("refused");
    vi.mocked(
      getOperationsSupabaseClient
    ).mockRejectedValue(refusal);

    await expect(getPriceLookupCatalog()).rejects.toBe(
      refusal
    );
    expect(mockFrom).not.toHaveBeenCalled();
  });
});
