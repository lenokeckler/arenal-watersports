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
import { getReservationRefund } from "../services/getReservationRefund";
import {
  EXPECTED_SCHEDULED,
  MALFORMED_RESERVATION_ID,
  NET_ROWS,
  REFUND_READ_FAILURE,
  REFUND_RESERVATION_ID,
  SCHEDULED_ROW,
  UPPERCASE_RESERVATION_ID,
} from "./ReservationRefund.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const maybeSingle = vi.fn();
const rpc = vi.fn();

describe("getReservationRefund", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    maybeSingle.mockResolvedValue({
      data: SCHEDULED_ROW,
      error: null,
    });
    rpc.mockResolvedValue({ data: NET_ROWS, error: null });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from, rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getReservationRefund(MALFORMED_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("accepts an uppercase identifier", async () => {
    await expect(
      getReservationRefund(UPPERCASE_RESERVATION_ID)
    ).resolves.toEqual(EXPECTED_SCHEDULED);
  });

  it("reads the reservation and its refundable net and maps them", async () => {
    await expect(
      getReservationRefund(REFUND_RESERVATION_ID)
    ).resolves.toEqual(EXPECTED_SCHEDULED);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_REFUND_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_REFUND_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_REFUND_QUERY.COLUMNS.ID,
      REFUND_RESERVATION_ID
    );
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_REFUND_QUERY.RPC.NET,
      {
        [RESERVATION_REFUND_QUERY.NET_ARGS.RESERVATION_ID]:
          REFUND_RESERVATION_ID,
      }
    );
  });

  it("returns null without reading the net when the reservation does not exist", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getReservationRefund(REFUND_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("returns an empty list when the function returns no rows", async () => {
    rpc.mockResolvedValue({ data: null, error: null });

    await expect(
      getReservationRefund(REFUND_RESERVATION_ID)
    ).resolves.toMatchObject({ refundable: [] });
  });

  it("throws a read failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: REFUND_READ_FAILURE,
    });

    await expect(
      getReservationRefund(REFUND_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_REFUND_ERROR.OPERATION.READ
    );
  });

  it("throws a net failure with its operation", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: REFUND_READ_FAILURE,
    });

    await expect(
      getReservationRefund(REFUND_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_REFUND_ERROR.OPERATION.READ_NET
    );
  });
});
