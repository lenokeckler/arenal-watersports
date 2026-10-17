import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { AVAILABLE_UNIT_TEST } from "./getAvailableReservationUnits.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const createSupabaseClient = (conflicts: object[]) => {
  const categoryQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({
      data: { id: AVAILABLE_UNIT_TEST.CATEGORY_ID },
      error: null,
    }),
  };
  const unitQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({
      data: [
        {
          code: AVAILABLE_UNIT_TEST.UNIT_CODE,
          id: AVAILABLE_UNIT_TEST.UNIT_ID,
        },
      ],
      error: null,
    }),
  };

  return {
    from: vi.fn((table: string) =>
      table === "equipment_categories"
        ? categoryQuery
        : unitQuery
    ),
    rpc: vi
      .fn()
      .mockResolvedValue({ data: conflicts, error: null }),
  };
};

const loadAvailableUnits = () =>
  getAvailableReservationUnits({
    categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
    date: AVAILABLE_UNIT_TEST.DATE,
    durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
    time: AVAILABLE_UNIT_TEST.TIME,
  });

describe("getAvailableReservationUnits", () => {
  beforeEach(() => vi.clearAllMocks());

  it("excludes units with conflicts in the selected reservation interval", async () => {
    const supabase = createSupabaseClient([
      {
        reservation_id:
          AVAILABLE_UNIT_TEST.EXISTING_RESERVATION_ID,
      },
    ]);
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(loadAvailableUnits()).resolves.toEqual([]);
    expect(supabase.rpc).toHaveBeenCalledWith(
      "unit_conflicts",
      {
        p_ends_at: AVAILABLE_UNIT_TEST.ENDS_AT,
        p_starts_at: AVAILABLE_UNIT_TEST.STARTS_AT,
        p_unit_id: AVAILABLE_UNIT_TEST.UNIT_ID,
      }
    );
  });

  it("returns units without conflicts for the selected interval", async () => {
    const supabase = createSupabaseClient([]);
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(loadAvailableUnits()).resolves.toEqual([
      {
        code: AVAILABLE_UNIT_TEST.UNIT_CODE,
        id: AVAILABLE_UNIT_TEST.UNIT_ID,
      },
    ]);
  });
});
