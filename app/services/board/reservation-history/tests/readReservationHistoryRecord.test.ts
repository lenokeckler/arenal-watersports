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
import { mapReservationHistoryRecord } from "../mapReservationHistoryRecord";
import { readReservationHistoryRecord } from "../readReservationHistoryRecord";
import { HISTORY_CANCELLED_RECORD_ROW } from "./ReservationHistory.constants";
import {
  HISTORY_READ_DATABASE_ERROR,
  HISTORY_READ_EMPTY_RESPONSE,
  HISTORY_READ_ERROR_RESPONSE,
  HISTORY_READ_MALFORMED_ID,
  HISTORY_READ_RECORD_RESPONSE,
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

describe("readReservationHistoryRecord", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    rpc.mockResolvedValue(HISTORY_READ_RECORD_RESPONSE);
    supabaseMocks.createServerSupabaseClient.mockResolvedValue(
      { rpc }
    );
  });

  it("asserts access before any database call", async () => {
    await readReservationHistoryRecord(
      HISTORY_CANCELLED_RECORD_ROW.id
    );

    expect(
      vi.mocked(assertActiveWorkModeAccess).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      supabaseMocks.createServerSupabaseClient.mock
        .invocationCallOrder[0]
    );
  });

  it("calls the record function and maps the first row", async () => {
    const record = await readReservationHistoryRecord(
      HISTORY_CANCELLED_RECORD_ROW.id
    );

    expect(rpc).toHaveBeenCalledWith(
      SUPABASE_RPC.GET_RESERVATION_HISTORY_RECORD,
      { p_reservation_id: HISTORY_CANCELLED_RECORD_ROW.id }
    );
    expect(record).toStrictEqual(
      mapReservationHistoryRecord(
        HISTORY_CANCELLED_RECORD_ROW
      )
    );
  });

  it("returns null without a call for a malformed id", async () => {
    await expect(
      readReservationHistoryRecord(
        HISTORY_READ_MALFORMED_ID
      )
    ).resolves.toBeNull();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("returns null when the database returns no rows", async () => {
    rpc.mockResolvedValue(HISTORY_READ_EMPTY_RESPONSE);

    await expect(
      readReservationHistoryRecord(
        HISTORY_CANCELLED_RECORD_ROW.id
      )
    ).resolves.toBeNull();
  });

  it("throws the database error with the record operation", async () => {
    rpc.mockResolvedValue(HISTORY_READ_ERROR_RESPONSE);

    await expect(
      readReservationHistoryRecord(
        HISTORY_CANCELLED_RECORD_ROW.id
      )
    ).rejects.toMatchObject({
      cause: HISTORY_READ_DATABASE_ERROR,
      message: expect.stringContaining(
        RESERVATION_HISTORY_OPERATION.RECORD
      ),
      name: HISTORY_READ_SUPABASE_ERROR_NAME,
    });
  });
});
