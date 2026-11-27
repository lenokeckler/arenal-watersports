import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_DEPOSIT_NO_PROPOSAL } from "../constants/ReservationDepositDefaults.constants";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_QUERY } from "../constants/ReservationDepositQuery.constants";
import { getReservationDeposit } from "../services/getReservationDeposit";
import {
  DECLINED_ROW,
  DEPOSIT_READ_FAILURE,
  DEPOSIT_RESERVATION_ID,
  MALFORMED_RESERVATION_ID,
  SPLIT_CHILD_ROW,
  UNDECIDED_DEPOSIT,
  UNDECIDED_ROW,
} from "./ReservationDeposit.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const from = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const maybeSingle = vi.fn();
const rpc = vi.fn();

const PROPOSAL_ROWS = [
  { proposal_crc: 100000, proposal_usd: 200 },
];

describe("getReservationDeposit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    from.mockReturnValue({ select });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    maybeSingle.mockResolvedValue({
      data: UNDECIDED_ROW,
      error: null,
    });
    rpc.mockResolvedValue({
      data: PROPOSAL_ROWS,
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
      getReservationDeposit(MALFORMED_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("reads the reservation and its proposal and maps them", async () => {
    await expect(
      getReservationDeposit(DEPOSIT_RESERVATION_ID)
    ).resolves.toEqual(UNDECIDED_DEPOSIT);
    expect(from).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.TABLE
    );
    expect(select).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.PROJECTION
    );
    expect(eq).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.COLUMNS.ID,
      DEPOSIT_RESERVATION_ID
    );
    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_DEPOSIT_QUERY.RPC.PROPOSAL,
      {
        [RESERVATION_DEPOSIT_QUERY.PROPOSAL_ARGS
          .RESERVATION_ID]: DEPOSIT_RESERVATION_ID,
      }
    );
  });

  it("returns null without the proposal when the reservation does not exist", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      getReservationDeposit(DEPOSIT_RESERVATION_ID)
    ).resolves.toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it.each([
    ["a decided reservation", DECLINED_ROW],
    ["a split child", SPLIT_CHILD_ROW],
    [
      "a closed reservation",
      {
        ...UNDECIDED_ROW,
        status: RESERVATION_STATUS.CLOSED,
      },
    ],
  ])("skips the proposal for %s", async (_, row) => {
    maybeSingle.mockResolvedValue({
      data: row,
      error: null,
    });

    await expect(
      getReservationDeposit(DEPOSIT_RESERVATION_ID)
    ).resolves.toMatchObject({
      proposal: RESERVATION_DEPOSIT_NO_PROPOSAL,
    });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("throws a read failure with its operation", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: DEPOSIT_READ_FAILURE,
    });

    await expect(
      getReservationDeposit(DEPOSIT_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_DEPOSIT_ERROR.OPERATION.READ
    );
  });

  it("throws a proposal failure with its operation", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: DEPOSIT_READ_FAILURE,
    });

    await expect(
      getReservationDeposit(DEPOSIT_RESERVATION_ID)
    ).rejects.toThrow(
      RESERVATION_DEPOSIT_ERROR.OPERATION.READ_PROPOSAL
    );
  });
});
