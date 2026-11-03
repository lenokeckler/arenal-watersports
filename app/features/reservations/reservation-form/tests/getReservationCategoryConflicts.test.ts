import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationCategoryConflicts } from "../services/getReservationCategoryConflicts";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  RESERVATION_CATEGORY_CONFLICT_INPUT,
  RESERVATION_CATEGORY_CONFLICT_ROW,
} from "./getReservationCategoryConflicts.constants";
import type { ReservationCategoryConflictsRpcResult } from "./models/ReservationCategoryConflictsRpcResult.interface";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const createSupabaseClient = (
  result: ReservationCategoryConflictsRpcResult
) => ({
  rpc: vi.fn().mockResolvedValue(result),
});

describe("getReservationCategoryConflicts", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads matching reservations for the selected interval", async () => {
    const supabase = createSupabaseClient({
      data: [RESERVATION_CATEGORY_CONFLICT_ROW],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryConflicts(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).resolves.toEqual([RESERVATION_CATEGORY_CONFLICT_ROW]);

    expect(supabase.rpc).toHaveBeenCalledWith(
      "reservation_category_conflicts",
      {
        p_category_id:
          RESERVATION_CATEGORY_CONFLICT_INPUT.categoryId,
        p_ends_at: "2030-01-01T18:00:00.000Z",
        p_starts_at: "2030-01-01T16:00:00.000Z",
      }
    );
  });

  it("returns an empty list when no reservation conflicts", async () => {
    const supabase = createSupabaseClient({
      data: [],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryConflicts(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).resolves.toEqual([]);
  });

  it("rejects an absent RPC result explicitly", async () => {
    const supabase = createSupabaseClient({
      data: null,
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryConflicts(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).rejects.toThrow("returned no result");
  });

  it("preserves Supabase error context", async () => {
    const supabase = createSupabaseClient({
      data: null,
      error: {
        code: "XX000",
        message: "Conflict lookup unavailable",
      },
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryConflicts(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).rejects.toThrow(SupabaseQueryError);
    await expect(
      getReservationCategoryConflicts(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).rejects.toThrow(
      "load reservation category conflicts"
    );
  });
});
