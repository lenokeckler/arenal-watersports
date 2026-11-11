import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationExtras } from "../services/getReservationExtras";
import { RESERVATION_EXTRA_TEST } from "./getReservationExtras.constants";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const createSupabaseClient = (extras: object[]) => {
  const query = {
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({
      data: extras,
      error: null,
    }),
    select: vi.fn().mockReturnThis(),
  };

  return {
    from: vi.fn().mockReturnValue(query),
    query,
  };
};

describe("getReservationExtras", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns active extras compatible with the selected unit", async () => {
    const supabase = createSupabaseClient([
      {
        id: RESERVATION_EXTRA_TEST.ACTIVE_EXTRA_ID,
        name: RESERVATION_EXTRA_TEST.ACTIVE_EXTRA_NAME,
        price_crc: RESERVATION_EXTRA_TEST.PRICE_CRC,
        price_usd: RESERVATION_EXTRA_TEST.PRICE_USD,
      },
    ]);
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationExtras({
        unitId: RESERVATION_EXTRA_TEST.UNIT_ID,
      })
    ).resolves.toEqual([
      {
        id: RESERVATION_EXTRA_TEST.ACTIVE_EXTRA_ID,
        name: RESERVATION_EXTRA_TEST.ACTIVE_EXTRA_NAME,
        priceCrc: RESERVATION_EXTRA_TEST.PRICE_CRC,
        priceUsd: RESERVATION_EXTRA_TEST.PRICE_USD,
      },
    ]);
    expect(supabase.from).toHaveBeenCalledWith("extras");
    expect(supabase.query.select).toHaveBeenCalledWith(
      "id, name, price_crc, price_usd, extra_compatibility!inner(unit_id)"
    );
    expect(supabase.query.eq).toHaveBeenNthCalledWith(
      1,
      "status",
      RESERVATION_CATEGORY_STATUS.ACTIVE
    );
    expect(supabase.query.eq).toHaveBeenNthCalledWith(
      2,
      "extra_compatibility.unit_id",
      RESERVATION_EXTRA_TEST.UNIT_ID
    );
  });

  it("returns an empty list when the selected unit has no compatible extras", async () => {
    const supabase = createSupabaseClient([]);
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabase as never);

    await expect(
      getReservationExtras({
        unitId: RESERVATION_EXTRA_TEST.WRONG_UNIT_ID,
      })
    ).resolves.toEqual([]);
  });

  it("preserves operation context when the extras query fails", async () => {
    const query = {
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: null,
        error: {
          code: "XX000",
          message: "Extras query failed",
        },
      }),
      select: vi.fn().mockReturnThis(),
    };
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({
      from: vi.fn().mockReturnValue(query),
    } as never);

    await expect(
      getReservationExtras({
        unitId: RESERVATION_EXTRA_TEST.UNIT_ID,
      })
    ).rejects.toThrow(
      "Supabase query failed: load reservation extras"
    );
  });
});
