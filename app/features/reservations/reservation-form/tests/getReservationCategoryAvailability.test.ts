import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationCategoryAvailability } from "../services/getReservationCategoryAvailability";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  RESERVATION_CATEGORY_AVAILABILITY_INPUT,
  RESERVATION_CATEGORY_AVAILABILITY_ROW,
} from "./getReservationInterval.constants";
import type { ReservationCategoryAvailabilityRpcResult } from "./models/ReservationCategoryAvailabilityRpcResult.interface";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const createSupabaseClient = (
  result: ReservationCategoryAvailabilityRpcResult
) => ({
  rpc: vi.fn().mockResolvedValue(result),
});

describe("getReservationCategoryAvailability", () => {
  beforeEach(() => vi.clearAllMocks());

  it("queries the category for the selected UTC interval", async () => {
    const supabase = createSupabaseClient({
      data: [RESERVATION_CATEGORY_AVAILABILITY_ROW],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryAvailability(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      )
    ).resolves.toEqual(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );

    expect(supabase.rpc).toHaveBeenCalledWith(
      "category_availability",
      {
        p_category_id:
          RESERVATION_CATEGORY_AVAILABILITY_INPUT.categoryId,
        p_ends_at: "2030-01-01T18:00:00.000Z",
        p_starts_at: "2030-01-01T16:00:00.000Z",
      }
    );
  });

  it("preserves a negative free quantity returned by the RPC", async () => {
    const supabase = createSupabaseClient({
      data: [RESERVATION_CATEGORY_AVAILABILITY_ROW],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    const availability =
      await getReservationCategoryAvailability(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      );

    expect(availability.free).toBe(-1);
  });

  it("rejects an empty RPC result explicitly", async () => {
    const supabase = createSupabaseClient({
      data: [],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationCategoryAvailability(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      )
    ).rejects.toThrow("returned no result");
  });

  it("propagates the Supabase error with operation context", async () => {
    const supabase = createSupabaseClient({
      data: null,
      error: {
        code: "XX000",
        message: "Availability unavailable",
      },
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    const request = getReservationCategoryAvailability(
      RESERVATION_CATEGORY_AVAILABILITY_INPUT
    );

    await expect(request).rejects.toThrow(
      SupabaseQueryError
    );
    await expect(request).rejects.toThrow(
      "load reservation category availability"
    );
  });
});
