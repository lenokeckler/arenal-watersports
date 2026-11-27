import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_CHARGE_QUERY } from "../constants/ReservationChargeQuery.constants";
import { recordReservationCharge } from "../services/recordReservationCharge";
import {
  CHARGE_RECORD_ROW,
  MIXED_CHARGE_COMMAND,
  VALID_CHARGE_COMMAND,
} from "./ReservationChargeAction.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("recordReservationCharge payload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
    rpc.mockResolvedValue({
      data: [CHARGE_RECORD_ROW],
      error: null,
    });
  });

  it.each([
    ["one part", VALID_CHARGE_COMMAND],
    ["two parts", MIXED_CHARGE_COMMAND],
  ])("sends %s in the parts array", async (_, command) => {
    await recordReservationCharge(command);

    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.RPC.RECORD,
      {
        p_payload: {
          parts: command.parts,
          payment_method: command.paymentMethod,
          reservation_id: command.reservationId,
        },
      }
    );
  });
});
