import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_SPLIT_QUERY } from "../constants/ReservationSplitQuery.constants";
import { getReservationSplit } from "../services/getReservationSplit";
import {
  EXPECTED_SPLIT,
  MALFORMED_RESERVATION_ID,
  SPLIT_RESERVATION_ID,
  SPLIT_ROW,
} from "./ReservationSplit.constants";
import {
  SPLIT_READ_ERROR,
  SPLIT_READ_ERROR_RESULT,
} from "./getReservationSplit.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const maybeSingle = vi.fn();
const eq = vi.fn();
const select = vi.fn();

describe("getReservationSplit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getReservationSplit(MALFORMED_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("returns null when the reservation does not exist", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getReservationSplit(SPLIT_RESERVATION_ID)
    ).resolves.toBeNull();
  });

  it("reads one reservation by id and maps it", async () => {
    maybeSingle.mockResolvedValue({
      data: SPLIT_ROW,
      error: null,
    });

    await expect(
      getReservationSplit(SPLIT_RESERVATION_ID)
    ).resolves.toEqual(EXPECTED_SPLIT);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_SPLIT_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_SPLIT_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_SPLIT_QUERY.COLUMNS.ID,
      SPLIT_RESERVATION_ID
    );
  });

  it("throws the database error with its operation", async () => {
    maybeSingle.mockResolvedValue(SPLIT_READ_ERROR_RESULT);

    await expect(
      getReservationSplit(SPLIT_RESERVATION_ID)
    ).rejects.toThrow(SPLIT_READ_ERROR.message);
  });
});
