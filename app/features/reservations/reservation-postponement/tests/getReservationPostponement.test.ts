import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_POSTPONEMENT_QUERY } from "../constants/ReservationPostponementQuery.constants";
import { getReservationPostponement } from "../services/getReservationPostponement";
import {
  EXPECTED_SCHEDULED,
  MALFORMED_RESERVATION_ID,
  POSTPONEMENT_RESERVATION_ID,
  SCHEDULED_ROW,
} from "./ReservationPostponement.constants";
import {
  POSTPONEMENT_READ_ERROR,
  POSTPONEMENT_READ_ERROR_RESULT,
} from "./getReservationPostponement.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const maybeSingle = vi.fn();
const eq = vi.fn();
const select = vi.fn();

describe("getReservationPostponement", () => {
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
      getReservationPostponement(MALFORMED_RESERVATION_ID)
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
      getReservationPostponement(
        POSTPONEMENT_RESERVATION_ID
      )
    ).resolves.toBeNull();
  });

  it("reads one reservation by id with the readings projection and maps it", async () => {
    maybeSingle.mockResolvedValue({
      data: SCHEDULED_ROW,
      error: null,
    });

    await expect(
      getReservationPostponement(
        POSTPONEMENT_RESERVATION_ID
      )
    ).resolves.toEqual(EXPECTED_SCHEDULED);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_POSTPONEMENT_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_POSTPONEMENT_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_POSTPONEMENT_QUERY.COLUMNS.ID,
      POSTPONEMENT_RESERVATION_ID
    );
  });

  it("throws the database error with its operation", async () => {
    maybeSingle.mockResolvedValue(
      POSTPONEMENT_READ_ERROR_RESULT
    );

    await expect(
      getReservationPostponement(
        POSTPONEMENT_RESERVATION_ID
      )
    ).rejects.toThrow(POSTPONEMENT_READ_ERROR.message);
  });
});
