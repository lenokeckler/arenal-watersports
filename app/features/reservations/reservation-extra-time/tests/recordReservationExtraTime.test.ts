import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import { recordReservationExtraTime } from "../services/recordReservationExtraTime";
import {
  EXTRA_TIME_AMOUNT,
  EXTRA_TIME_CHARGED_RECORD_ROW,
  EXTRA_TIME_RESERVATION_ID,
} from "./ReservationExtraTime.constants";
import {
  EXTRA_TIME_CHARGED_RECORDED,
  EXTRA_TIME_READ_FAILURE,
} from "./ReservationExtraTimeData.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();
const { PAYLOAD_KEY } = QUERY;

const CHARGED_COMMAND = {
  charge: {
    amount: EXTRA_TIME_AMOUNT,
    currency: CURRENCY_CODE.USD,
    paymentMethod: "Efectivo",
  },
  outcome: OUTCOME.CHARGED,
  reservationId: EXTRA_TIME_RESERVATION_ID,
};

describe("recordReservationExtraTime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rpc.mockResolvedValue({
      data: [EXTRA_TIME_CHARGED_RECORD_ROW],
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        rpc,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("sends the charge with its amount, currency and method", async () => {
    await expect(
      recordReservationExtraTime(CHARGED_COMMAND)
    ).resolves.toEqual(EXTRA_TIME_CHARGED_RECORDED);
    expect(rpc).toHaveBeenCalledWith(QUERY.RPC.RECORD, {
      [PAYLOAD_KEY.PAYLOAD]: {
        [PAYLOAD_KEY.AMOUNT]: EXTRA_TIME_AMOUNT,
        [PAYLOAD_KEY.CURRENCY]: CURRENCY_CODE.USD,
        [PAYLOAD_KEY.OUTCOME]: OUTCOME.CHARGED,
        [PAYLOAD_KEY.PAYMENT_METHOD]: "Efectivo",
        [PAYLOAD_KEY.RESERVATION_ID]:
          EXTRA_TIME_RESERVATION_ID,
      },
    });
  });

  it("sends only the outcome for a courtesy", async () => {
    await recordReservationExtraTime({
      charge: null,
      outcome: OUTCOME.COURTESY,
      reservationId: EXTRA_TIME_RESERVATION_ID,
    });

    expect(rpc).toHaveBeenCalledWith(QUERY.RPC.RECORD, {
      [PAYLOAD_KEY.PAYLOAD]: {
        [PAYLOAD_KEY.OUTCOME]: OUTCOME.COURTESY,
        [PAYLOAD_KEY.RESERVATION_ID]:
          EXTRA_TIME_RESERVATION_ID,
      },
    });
  });

  it("throws the database refusal", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: {
        ...EXTRA_TIME_READ_FAILURE,
        message:
          RESERVATION_EXTRA_TIME_ERROR.MESSAGE
            .ALREADY_RESOLVED,
      },
    });

    await expect(
      recordReservationExtraTime(CHARGED_COMMAND)
    ).rejects.toThrow(
      RESERVATION_EXTRA_TIME_ERROR.MESSAGE.ALREADY_RESOLVED
    );
  });

  it("throws when the database returns no decision", async () => {
    rpc.mockResolvedValue({ data: [], error: null });

    await expect(
      recordReservationExtraTime(CHARGED_COMMAND)
    ).rejects.toThrow(
      RESERVATION_EXTRA_TIME_ERROR.OPERATION.MISSING_RECORD
    );
  });
});
