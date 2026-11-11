import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_QUERY } from "../constants/ReservationCancellationQuery.constants";
import { getReservationCancellation } from "../services/getReservationCancellation";
import {
  CANCELLATION_RESERVATION_ID,
  EXPECTED_SCHEDULED,
  MALFORMED_RESERVATION_ID,
  SCHEDULED_ROW,
} from "./ReservationCancellation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const maybeSingle = vi.fn();
const READ_FAILURE = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};

describe("getReservationCancellation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getReservationCancellation(MALFORMED_RESERVATION_ID)
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
      getReservationCancellation(
        CANCELLATION_RESERVATION_ID
      )
    ).resolves.toBeNull();
  });

  it("reads one reservation by id and maps it", async () => {
    maybeSingle.mockResolvedValue({
      data: SCHEDULED_ROW,
      error: null,
    });

    await expect(
      getReservationCancellation(
        CANCELLATION_RESERVATION_ID
      )
    ).resolves.toEqual(EXPECTED_SCHEDULED);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_CANCELLATION_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_CANCELLATION_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_CANCELLATION_QUERY.COLUMNS.ID,
      CANCELLATION_RESERVATION_ID
    );
  });

  it("throws a read failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: READ_FAILURE,
    });

    await expect(
      getReservationCancellation(
        CANCELLATION_RESERVATION_ID
      )
    ).rejects.toThrow(
      RESERVATION_CANCELLATION_ERROR.OPERATION.READ
    );
  });
});
