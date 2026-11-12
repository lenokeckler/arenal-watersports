import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_QUERY } from "../constants/ReservationChargeQuery.constants";
import { recordReservationCharge } from "../services/recordReservationCharge";
import {
  CHARGE_RECORD_ROW,
  CHARGE_RECORDED,
  VALID_CHARGE_COMMAND,
} from "./ReservationChargeAction.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();
const NOT_CHARGEABLE_FAILURE = {
  code: "P0001",
  details: "",
  hint: "",
  message: RESERVATION_CHARGE_ERROR.MESSAGE.NOT_CHARGEABLE,
};

describe("recordReservationCharge", () => {
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
      data: [CHARGE_RECORD_ROW],
      error: null,
    });

    await expect(
      recordReservationCharge(VALID_CHARGE_COMMAND)
    ).resolves.toEqual(CHARGE_RECORDED);
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.RPC.RECORD,
      {
        p_payload: {
          amount: VALID_CHARGE_COMMAND.amount,
          currency: VALID_CHARGE_COMMAND.currency,
          payment_method:
            VALID_CHARGE_COMMAND.paymentMethod,
          reservation_id:
            VALID_CHARGE_COMMAND.reservationId,
        },
      }
    );
  });

  it("keeps the database message in the thrown error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: NOT_CHARGEABLE_FAILURE,
    });

    await expect(
      recordReservationCharge(VALID_CHARGE_COMMAND)
    ).rejects.toThrow(
      RESERVATION_CHARGE_ERROR.MESSAGE.NOT_CHARGEABLE
    );
  });

  it("refuses an empty answer", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    await expect(
      recordReservationCharge(VALID_CHARGE_COMMAND)
    ).rejects.toThrow(
      RESERVATION_CHARGE_ERROR.OPERATION.MISSING_CHARGE
    );
  });
});
