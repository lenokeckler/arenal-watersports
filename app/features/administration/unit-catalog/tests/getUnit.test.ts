import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  UNIT_EFFECTIVE_STATUS,
  UNIT_STATUS,
} from "../constants/UnitStatus.constants";
import { getUnit } from "../services/getUnit";
import {
  DEFAULT_UNIT,
  DEFAULT_UNIT_ROW,
  FAKE_UNIT_ID,
} from "./Unit.constants";

const UNITS_TABLE = "equipment_units";
const ID_COLUMN = "id";

const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
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

describe("getUnit", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockSelect.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("reads the unit with the given id from the units table", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_UNIT_ROW,
      error: null,
    });

    await getUnit(FAKE_UNIT_ID);

    expect(mockFrom).toHaveBeenCalledWith(UNITS_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      FAKE_UNIT_ID
    );
  });

  it("returns the row mapped to a unit", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({
        data: DEFAULT_UNIT_ROW,
        error: null,
      })
      .mockResolvedValueOnce({
        data: { effective_status: UNIT_STATUS.AVAILABLE },
        error: null,
      });

    expect(await getUnit(FAKE_UNIT_ID)).toEqual(
      DEFAULT_UNIT
    );
  });

  it("marks the unit as occupied when its effective status is occupied", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({
        data: DEFAULT_UNIT_ROW,
        error: null,
      })
      .mockResolvedValueOnce({
        data: {
          effective_status: UNIT_EFFECTIVE_STATUS.OCCUPIED,
        },
        error: null,
      });

    expect(await getUnit(FAKE_UNIT_ID)).toMatchObject({
      isOccupied: true,
    });
  });

  it("throws when the effective status read fails", async () => {
    mockMaybeSingle
      .mockResolvedValueOnce({
        data: DEFAULT_UNIT_ROW,
        error: null,
      })
      .mockResolvedValueOnce({
        data: null,
        error: { code: "500", message: "boom" },
      });

    await expect(getUnit(FAKE_UNIT_ID)).rejects.toThrow(
      SupabaseQueryError
    );
  });

  it("returns null when no unit matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await getUnit(FAKE_UNIT_ID)).toBeNull();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "invalid input syntax for type uuid",
      },
    });

    expect(await getUnit(FAKE_UNIT_ID)).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(getUnit(FAKE_UNIT_ID)).rejects.toThrow(
      SupabaseQueryError
    );
  });
});
