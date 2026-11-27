import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import { getReservationExtraTime } from "../services/getReservationExtraTime";
import {
  EXTRA_TIME_EXTENDED_ROW,
  EXTRA_TIME_OVERDUE_ROW,
  EXTRA_TIME_RESERVATION_ID,
  EXTRA_TIME_RESERVATION_ROW,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";
import {
  EXTRA_TIME_MALFORMED_ID,
  EXTRA_TIME_READ_FAILURE,
} from "./ReservationExtraTimeData.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const reservationSingle = vi.fn();
const resolutionSingle = vi.fn();
const rpc = vi.fn();

const RESOLUTION_ROW = {
  extra_minutes: EXTRA_TIME_TOTAL_MINUTES,
  outcome: RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
};

describe("getReservationExtraTime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockImplementation((table: string) => ({
      select: select.mockReturnValue({
        eq: eq.mockReturnValue({
          maybeSingle:
            table === QUERY.TABLE.RESERVATIONS
              ? reservationSingle
              : resolutionSingle,
        }),
      }),
    }));
    reservationSingle.mockResolvedValue({
      data: EXTRA_TIME_RESERVATION_ROW,
      error: null,
    });
    resolutionSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    rpc.mockResolvedValue({
      data: [
        EXTRA_TIME_OVERDUE_ROW,
        EXTRA_TIME_EXTENDED_ROW,
      ],
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from,
        rpc,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getReservationExtraTime(EXTRA_TIME_MALFORMED_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("returns null for a reservation that does not exist", async () => {
    reservationSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getReservationExtraTime(EXTRA_TIME_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("reads the groups and the decision of the reservation", async () => {
    resolutionSingle.mockResolvedValue({
      data: RESOLUTION_ROW,
      error: null,
    });

    const extraTime = await getReservationExtraTime(
      EXTRA_TIME_RESERVATION_ID
    );

    expect(rpc).toHaveBeenCalledWith(QUERY.RPC.GROUPS, {
      [QUERY.ARGS.RESERVATION_ID]:
        EXTRA_TIME_RESERVATION_ID,
    });
    expect(from).toHaveBeenCalledWith(
      QUERY.TABLE.RESOLUTIONS
    );
    expect(eq).toHaveBeenCalledWith(
      QUERY.COLUMNS.RESERVATION_ID,
      EXTRA_TIME_RESERVATION_ID
    );
    expect(extraTime).toMatchObject({
      id: EXTRA_TIME_RESERVATION_ID,
      resolution: {
        extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
        outcome: RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
      },
      totalMinutes: EXTRA_TIME_TOTAL_MINUTES,
    });
  });

  it("treats a missing groups list as no groups", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      getReservationExtraTime(EXTRA_TIME_RESERVATION_ID)
    ).resolves.toMatchObject({
      groups: [],
      totalMinutes: 0,
    });
  });

  it.each([
    [
      "reservation",
      reservationSingle,
      RESERVATION_EXTRA_TIME_ERROR.OPERATION
        .READ_RESERVATION,
    ],
    [
      "decision",
      resolutionSingle,
      RESERVATION_EXTRA_TIME_ERROR.OPERATION
        .READ_RESOLUTION,
    ],
    [
      "groups",
      rpc,
      RESERVATION_EXTRA_TIME_ERROR.OPERATION.READ_GROUPS,
    ],
  ])(
    "throws when the %s read fails",
    async (_, read, operation) => {
      read.mockResolvedValue({
        data: null,
        error: EXTRA_TIME_READ_FAILURE,
      });

      await expect(
        getReservationExtraTime(EXTRA_TIME_RESERVATION_ID)
      ).rejects.toThrow(operation);
    }
  );
});
