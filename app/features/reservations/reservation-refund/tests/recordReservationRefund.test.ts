import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_QUERY } from "../constants/ReservationRefundQuery.constants";
import { recordReservationRefund } from "../services/recordReservationRefund";
import {
  EXCEEDS_NET_FAILURE,
  REFUND_RECORD_ROW,
  REFUND_RECORDED,
  VALID_REFUND_COMMAND,
} from "./ReservationRefundAction.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("recordReservationRefund", () => {
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
      data: [REFUND_RECORD_ROW],
      error: null,
    });

    await expect(
      recordReservationRefund(VALID_REFUND_COMMAND)
    ).resolves.toEqual(REFUND_RECORDED);
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_REFUND_QUERY.RPC.RECORD,
      {
        p_payload: {
          amount: VALID_REFUND_COMMAND.amount,
          currency: VALID_REFUND_COMMAND.currency,
          reason: VALID_REFUND_COMMAND.reason,
          reservation_id:
            VALID_REFUND_COMMAND.reservationId,
        },
      }
    );
  });

  it("keeps the database message in the thrown error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: EXCEEDS_NET_FAILURE,
    });

    await expect(
      recordReservationRefund(VALID_REFUND_COMMAND)
    ).rejects.toThrow(
      RESERVATION_REFUND_ERROR.MESSAGE.EXCEEDS_NET
    );
  });

  it("refuses an empty answer", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    await expect(
      recordReservationRefund(VALID_REFUND_COMMAND)
    ).rejects.toThrow(
      RESERVATION_REFUND_ERROR.OPERATION.MISSING_REFUND
    );
  });
});
