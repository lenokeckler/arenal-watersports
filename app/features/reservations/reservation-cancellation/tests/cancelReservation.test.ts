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
import { cancelReservation } from "../services/cancelReservation";
import {
  CANCELLATION_RESERVATION_ID,
  VALID_CANCELLATION_INPUT,
} from "./ReservationCancellation.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();
const STALE_FAILURE = {
  code: "P0001",
  details: "",
  hint: "",
  message: RESERVATION_CANCELLATION_ERROR.MESSAGE.STALE,
};

describe("cancelReservation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("calls the database function with the snake case payload", async () => {
    rpc.mockResolvedValue({
      data: CANCELLATION_RESERVATION_ID,
      error: null,
    });

    await expect(
      cancelReservation(VALID_CANCELLATION_INPUT)
    ).resolves.toBe(CANCELLATION_RESERVATION_ID);
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_CANCELLATION_QUERY.RPC,
      {
        p_payload: {
          expected_updated_at:
            VALID_CANCELLATION_INPUT.expectedUpdatedAt,
          reason: VALID_CANCELLATION_INPUT.reason,
          reservation_id:
            VALID_CANCELLATION_INPUT.reservationId,
        },
      }
    );
  });

  it("keeps the database message in the thrown error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: STALE_FAILURE,
    });

    await expect(
      cancelReservation(VALID_CANCELLATION_INPUT)
    ).rejects.toThrow(
      RESERVATION_CANCELLATION_ERROR.MESSAGE.STALE
    );
  });

  it("refuses an empty answer", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      cancelReservation(VALID_CANCELLATION_INPUT)
    ).rejects.toThrow(
      RESERVATION_CANCELLATION_ERROR.OPERATION
        .MISSING_RESERVATION
    );
  });
});
