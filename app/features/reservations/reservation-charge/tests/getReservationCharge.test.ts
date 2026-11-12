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
import { getReservationCharge } from "../services/getReservationCharge";
import {
  BOTH_PROPOSAL_ROW,
  CANCELLED_ROW,
  CHARGE_READ_FAILURE,
  CHARGE_RESERVATION_ID,
  EMPTY_PROPOSAL,
  EXPECTED_SCHEDULED,
  MALFORMED_RESERVATION_ID,
  SCHEDULED_ROW,
  SPLIT_CHILD_ROW,
} from "./ReservationCharge.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const maybeSingle = vi.fn();
const rpc = vi.fn();

describe("getReservationCharge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    rpc.mockResolvedValue({
      data: [BOTH_PROPOSAL_ROW],
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from, rpc } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
  });

  it("makes no query for a malformed identifier", async () => {
    await expect(
      getReservationCharge(MALFORMED_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("returns null when the reservation does not exist", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getReservationCharge(CHARGE_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("reads the reservation and its proposal and maps them", async () => {
    maybeSingle.mockResolvedValue({
      data: SCHEDULED_ROW,
      error: null,
    });

    await expect(
      getReservationCharge(CHARGE_RESERVATION_ID)
    ).resolves.toEqual(EXPECTED_SCHEDULED);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.COLUMNS.ID,
      CHARGE_RESERVATION_ID
    );
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_CHARGE_QUERY.RPC.PROPOSAL,
      {
        [RESERVATION_CHARGE_QUERY.PROPOSAL_ARGS
          .RESERVATION_ID]: CHARGE_RESERVATION_ID,
      }
    );
  });

  it.each([
    ["cancelled", CANCELLED_ROW],
    ["split child", SPLIT_CHILD_ROW],
  ])(
    "skips the proposal for a %s reservation",
    async (_label, row) => {
      maybeSingle.mockResolvedValue({
        data: row,
        error: null,
      });

      await expect(
        getReservationCharge(CHARGE_RESERVATION_ID)
      ).resolves.toMatchObject({
        proposal: EMPTY_PROPOSAL,
      });
      expect(rpc).not.toHaveBeenCalled();
    }
  );

  it("throws a read failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: CHARGE_READ_FAILURE,
    });

    await expect(
      getReservationCharge(CHARGE_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_CHARGE_ERROR.OPERATION.READ
    );
  });

  it("throws a proposal failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: SCHEDULED_ROW,
      error: null,
    });
    rpc.mockResolvedValue({
      data: null,
      error: CHARGE_READ_FAILURE,
    });

    await expect(
      getReservationCharge(CHARGE_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_CHARGE_ERROR.OPERATION.READ_PROPOSAL
    );
  });
});
