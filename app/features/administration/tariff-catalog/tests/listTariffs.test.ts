import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { TARIFF_CATEGORY_STATUS } from "../constants/TariffCategoryStatus.constants";
import { listTariffs } from "../services/listTariffs";
import { mapTariffRowToCatalogRow } from "../utils/mapTariffRowToCatalogRow";
import { buildPostgrestError } from "./buildPostgrestError";
import {
  buildTariffRow,
  CATEGORIES_TABLE,
  ID_COLUMN,
  NAME_COLUMN,
  SECOND_CATEGORY_ID,
  SECOND_CATEGORY_NAME,
  STATUS_COLUMN,
} from "./TariffCatalog.constants";

const mockSecondOrder = vi.fn();
const mockFirstOrder = vi.fn(
  (_column: string, _options: object) => ({
    order: mockSecondOrder,
  })
);
const mockEq = vi.fn((_column: string, _value: string) => ({
  order: mockFirstOrder,
}));
const mockSelect = vi.fn((_columns: string) => ({
  eq: mockEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("listTariffs", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockFirstOrder.mockClear();
    mockSecondOrder.mockReset();
  });

  it("lists the active categories with their tariffs, ordered by name", async () => {
    const rows = [
      buildTariffRow(),
      buildTariffRow({
        id: SECOND_CATEGORY_ID,
        name: SECOND_CATEGORY_NAME,
        tariffs: [],
      }),
    ];
    mockSecondOrder.mockResolvedValue({
      data: rows,
      error: null,
    });

    expect(await listTariffs()).toEqual(
      rows.map(mapTariffRowToCatalogRow)
    );
    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      STATUS_COLUMN,
      TARIFF_CATEGORY_STATUS.ACTIVE
    );
    expect(mockFirstOrder).toHaveBeenCalledWith(
      NAME_COLUMN,
      {
        ascending: true,
      }
    );
    expect(mockSecondOrder).toHaveBeenCalledWith(
      ID_COLUMN,
      {
        ascending: true,
      }
    );
  });

  it("returns an empty list when there are no categories", async () => {
    mockSecondOrder.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await listTariffs()).toEqual([]);
  });

  it("throws when the query fails", async () => {
    mockSecondOrder.mockResolvedValue({
      data: null,
      error: buildPostgrestError(
        POSTGRES_ERROR_CODE.RAISE_EXCEPTION
      ),
    });

    await expect(listTariffs()).rejects.toBeInstanceOf(
      SupabaseQueryError
    );
  });
});
