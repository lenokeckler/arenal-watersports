import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { recordReservationCharge } from "../services/recordReservationCharge";
import { VALID_CHARGE_COMMAND } from "./ReservationChargeAction.constants";
import {
  CRC_FIRST_ROWS,
  MIXED_RECORDED,
} from "./ReservationChargeRecordedParts.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

describe("recordReservationCharge rows", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("maps every returned row to a part", async () => {
    rpc.mockResolvedValue({
      data: CRC_FIRST_ROWS,
      error: null,
    });

    await expect(
      recordReservationCharge(VALID_CHARGE_COMMAND)
    ).resolves.toEqual(MIXED_RECORDED);
  });

  it("refuses a missing answer", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      recordReservationCharge(VALID_CHARGE_COMMAND)
    ).rejects.toThrow(
      RESERVATION_CHARGE_ERROR.OPERATION.MISSING_CHARGE
    );
  });
});
