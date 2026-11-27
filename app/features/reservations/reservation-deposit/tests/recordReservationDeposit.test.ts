import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_QUERY } from "../constants/ReservationDepositQuery.constants";
import { recordReservationDeposit } from "../services/recordReservationDeposit";
import { mapReservationDepositRecorded } from "../utils/mapReservationDepositRecorded";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";
import {
  ALREADY_DECIDED_FAILURE,
  DECLINED_RECORD_ROW,
  RECEIVED_RECORD_ROW,
} from "./ReservationDepositAction.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();

const RECEIVED_COMMAND = {
  amount: 200,
  currency: CURRENCY_CODE.USD,
  hasDeposit: true,
  reservationId: DEPOSIT_RESERVATION_ID,
} as const;

const DECLINED_COMMAND = {
  hasDeposit: false,
  reservationId: DEPOSIT_RESERVATION_ID,
} as const;

describe("recordReservationDeposit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("sends a received deposit with its amount and currency", async () => {
    rpc.mockResolvedValue({
      data: [RECEIVED_RECORD_ROW],
      error: null,
    });

    await expect(
      recordReservationDeposit(RECEIVED_COMMAND)
    ).resolves.toEqual(
      mapReservationDepositRecorded(RECEIVED_RECORD_ROW)
    );
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.RPC.RECORD,
      {
        p_payload: {
          amount: 200,
          currency: CURRENCY_CODE.USD,
          has_deposit: true,
          reservation_id: DEPOSIT_RESERVATION_ID,
        },
      }
    );
  });

  it("sends the no deposit answer without amount nor currency", async () => {
    rpc.mockResolvedValue({
      data: [DECLINED_RECORD_ROW],
      error: null,
    });

    await expect(
      recordReservationDeposit(DECLINED_COMMAND)
    ).resolves.toEqual(
      mapReservationDepositRecorded(DECLINED_RECORD_ROW)
    );
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.RPC.RECORD,
      {
        p_payload: {
          has_deposit: false,
          reservation_id: DEPOSIT_RESERVATION_ID,
        },
      }
    );
  });

  it("keeps the database message in the thrown error", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: ALREADY_DECIDED_FAILURE,
    });

    await expect(
      recordReservationDeposit(RECEIVED_COMMAND)
    ).rejects.toThrow(
      RESERVATION_DEPOSIT_ERROR.MESSAGE.ALREADY_DECIDED
    );
  });

  it("refuses an empty answer", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    await expect(
      recordReservationDeposit(RECEIVED_COMMAND)
    ).rejects.toThrow(
      RESERVATION_DEPOSIT_ERROR.OPERATION.MISSING_DEPOSIT
    );
  });
});
