import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  RESERVATION_HISTORY_OPERATION,
  SUPABASE_RPC,
} from "@/app/constants";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import { buildReservationHistoryListArguments } from "../buildReservationHistoryListArguments";
import { buildReservationHistoryPage } from "../buildReservationHistoryPage";
import { readReservationHistory } from "../readReservationHistory";
import {
  HISTORY_READ_DATABASE_ERROR,
  HISTORY_READ_EMPTY_RESPONSE,
  HISTORY_READ_ERROR_RESPONSE,
  HISTORY_READ_INVERTED_QUERY,
  HISTORY_READ_LIST_RESPONSE,
  HISTORY_READ_QUERY,
  HISTORY_READ_SUPABASE_ERROR_NAME,
} from "./ReservationHistoryRead.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));
vi.mock(
  "@/app/services/work-mode/assertActiveWorkModeAccess",
  () => ({ assertActiveWorkModeAccess: vi.fn() })
);

const rpc = vi.fn();

describe("readReservationHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rpc.mockResolvedValue(HISTORY_READ_LIST_RESPONSE);
    supabaseMocks.createServerSupabaseClient.mockResolvedValue(
      { rpc }
    );
  });

  it("asserts access before any database call", async () => {
    await readReservationHistory(HISTORY_READ_QUERY);

    expect(
      vi.mocked(assertActiveWorkModeAccess).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      supabaseMocks.createServerSupabaseClient.mock
        .invocationCallOrder[0]
    );
  });

  it("calls the list function with the built arguments", async () => {
    const page = await readReservationHistory(
      HISTORY_READ_QUERY
    );

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.LIST_RESERVATION_HISTORY,
      buildReservationHistoryListArguments(
        HISTORY_READ_QUERY
      )
    );
    expect(page).toStrictEqual(
      buildReservationHistoryPage(
        HISTORY_READ_LIST_RESPONSE.data
      )
    );
  });

  it("returns the empty page without a call for an inverted range", async () => {
    const page = await readReservationHistory(
      HISTORY_READ_INVERTED_QUERY
    );

    expect(rpc).not.toHaveBeenCalled();
    expect(page).toStrictEqual(
      buildReservationHistoryPage([])
    );
  });

  it("returns the empty page when nothing matches", async () => {
    rpc.mockResolvedValue(HISTORY_READ_EMPTY_RESPONSE);

    await expect(
      readReservationHistory(HISTORY_READ_QUERY)
    ).resolves.toStrictEqual(
      buildReservationHistoryPage([])
    );
  });

  it("throws the database error with the list operation", async () => {
    rpc.mockResolvedValue(HISTORY_READ_ERROR_RESPONSE);

    await expect(
      readReservationHistory(HISTORY_READ_QUERY)
    ).rejects.toMatchObject({
      cause: HISTORY_READ_DATABASE_ERROR,
      message: expect.stringContaining(
        RESERVATION_HISTORY_OPERATION.LIST
      ),
      name: HISTORY_READ_SUPABASE_ERROR_NAME,
    });
  });
});
