import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getExtra } from "../services/getExtra";
import {
  DEFAULT_EXTRA,
  DEFAULT_EXTRA_ROW,
  FAKE_EXTRA_ID,
} from "./Extra.constants";
import {
  EXTRA_ID_COLUMN,
  EXTRAS_TABLE,
  INVALID_UUID_MESSAGE,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";

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

describe("getExtra", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("reads the extra with the given id from the extras table", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EXTRA_ROW,
      error: null,
    });

    await getExtra(FAKE_EXTRA_ID);

    expect(mockFrom).toHaveBeenCalledWith(EXTRAS_TABLE);
    expect(mockEq).toHaveBeenCalledWith(
      EXTRA_ID_COLUMN,
      FAKE_EXTRA_ID
    );
  });

  it("returns the row mapped to an extra", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_EXTRA_ROW,
      error: null,
    });

    expect(await getExtra(FAKE_EXTRA_ID)).toEqual(
      DEFAULT_EXTRA
    );
  });

  it("returns null when no extra matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(await getExtra(FAKE_EXTRA_ID)).toBeNull();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: INVALID_UUID_MESSAGE,
      },
    });

    expect(await getExtra(FAKE_EXTRA_ID)).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: SERVER_ERROR_CODE, message: "boom" },
    });

    await expect(getExtra(FAKE_EXTRA_ID)).rejects.toThrow(
      SupabaseQueryError
    );
  });
});
