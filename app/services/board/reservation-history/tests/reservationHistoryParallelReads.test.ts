import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import { readReservationHistory } from "../readReservationHistory";
import { readReservationHistoryCategoryOptions } from "../readReservationHistoryCategoryOptions";
import { readReservationHistoryRecord } from "../readReservationHistoryRecord";
import { HISTORY_CANCELLED_RECORD_ROW } from "./ReservationHistory.constants";
import {
  HISTORY_READ_ACCESS_REFUSED,
  HISTORY_READ_QUERY,
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

describe("reservation history parallel reads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(assertActiveWorkModeAccess).mockRejectedValue(
      HISTORY_READ_ACCESS_REFUSED
    );
  });

  it("settles every read as refused without touching the database", async () => {
    const results = await Promise.allSettled([
      readReservationHistory(HISTORY_READ_QUERY),
      readReservationHistoryCategoryOptions(),
      readReservationHistoryRecord(
        HISTORY_CANCELLED_RECORD_ROW.id
      ),
    ]);

    expect(results).toStrictEqual(
      results.map(() => ({
        reason: HISTORY_READ_ACCESS_REFUSED,
        status: "rejected",
      }))
    );
    expect(
      supabaseMocks.createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("rejects the screen load with the refusal", async () => {
    await expect(
      Promise.all([
        readReservationHistory(HISTORY_READ_QUERY),
        readReservationHistoryCategoryOptions(),
      ])
    ).rejects.toBe(HISTORY_READ_ACCESS_REFUSED);
  });
});
