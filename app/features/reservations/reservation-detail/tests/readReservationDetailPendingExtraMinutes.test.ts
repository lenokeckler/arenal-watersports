import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import {
  RESERVATION_DETAIL_EXTRA_TIME_OUTCOME as OUTCOME,
  RESERVATION_DETAIL_NO_EXTRA_MINUTES,
  RESERVATION_DETAIL_OPERATION,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";
import { readReservationDetailPendingExtraMinutes } from "../services/readReservationDetailPendingExtraMinutes";
import { createReservationDetailSupabaseClient } from "./createReservationDetailSupabaseClient";
import { RESERVATION_DETAIL_EXTRA_TIME_TEST as TEST } from "./ReservationDetailExtraTimeTest.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";

const CLOSED = {
  id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
  reservation_extra_time_resolutions: null,
  status: RESERVATION_STATUS.CLOSED,
};

const READ_FAILURE = {
  code: "42501",
  details: null,
  hint: null,
  message: "permission denied",
};

describe("readReservationDetailPendingExtraMinutes", () => {
  beforeEach(() => vi.clearAllMocks());

  it("adds the extra minutes of every group of a closed reservation", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.rpc.mockResolvedValue({
      data: TEST.GROUP_MINUTES.map((extra_minutes) => ({
        extra_minutes,
      })),
      error: null,
    });

    await expect(
      readReservationDetailPendingExtraMinutes(
        supabase.client,
        CLOSED
      )
    ).resolves.toBe(TEST.MINUTES);
    expect(supabase.rpc).toHaveBeenCalledWith(
      RESERVATION_DETAIL_QUERY.EXTRA_TIME.RPC,
      {
        [RESERVATION_DETAIL_QUERY.EXTRA_TIME.ARG]:
          RESERVATION_DETAIL_TEST.RESERVATION_ID,
      }
    );
  });

  it.each([
    [
      "is not closed",
      { ...CLOSED, status: RESERVATION_STATUS.DISPATCHED },
    ],
    [
      "was already resolved",
      {
        ...CLOSED,
        reservation_extra_time_resolutions: {
          extra_minutes: TEST.MINUTES,
          outcome: OUTCOME.CHARGED,
        },
      },
    ],
  ])(
    "asks nothing when the reservation %s",
    async (_, source) => {
      const supabase =
        createReservationDetailSupabaseClient();

      await expect(
        readReservationDetailPendingExtraMinutes(
          supabase.client,
          source
        )
      ).resolves.toBe(RESERVATION_DETAIL_NO_EXTRA_MINUTES);
      expect(supabase.rpc).not.toHaveBeenCalled();
    }
  );

  it("throws when the groups cannot be read", async () => {
    const supabase =
      createReservationDetailSupabaseClient();
    supabase.rpc.mockResolvedValue({
      data: null,
      error: READ_FAILURE,
    });

    await expect(
      readReservationDetailPendingExtraMinutes(
        supabase.client,
        CLOSED
      )
    ).rejects.toThrow(
      RESERVATION_DETAIL_OPERATION.EXTRA_TIME
    );
  });
});
