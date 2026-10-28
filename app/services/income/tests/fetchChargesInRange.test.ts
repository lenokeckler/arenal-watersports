import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CHARGE_QUERY } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { ChargesTruncatedError } from "../ChargesTruncatedError";
import { fetchChargesInRange } from "../fetchChargesInRange";
import {
  BOTH_ROWS,
  BOTH_ROWS_COUNT,
  CRC_SINPE_MOVEMENT,
  DAY_RANGE,
  MORE_ROWS_THAN_RETURNED,
  POSTGREST_ERROR,
  USD_CARD_MOVEMENT,
} from "./Charges.constants";
import { ChargesQueryPage } from "./ChargesQuery.page";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

describe("fetchChargesInRange", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("reads the charges table counting rows inside the half-open range", async () => {
    const page = ChargesQueryPage.respondingWith({
      data: [],
      error: null,
      count: 0,
    });

    await fetchChargesInRange(DAY_RANGE);

    expect(page.from).toHaveBeenCalledWith(
      CHARGE_QUERY.TABLE
    );
    expect(page.select).toHaveBeenCalledWith(
      CHARGE_QUERY.SELECT,
      { count: CHARGE_QUERY.COUNT }
    );
    expect(page.gte).toHaveBeenCalledWith(
      CHARGE_QUERY.CREATED_AT_COLUMN,
      DAY_RANGE.startsAt
    );
    expect(page.lt).toHaveBeenCalledWith(
      CHARGE_QUERY.CREATED_AT_COLUMN,
      DAY_RANGE.endsAt
    );
  });

  it("returns the mapped movements in the order received", async () => {
    ChargesQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: null,
      count: BOTH_ROWS_COUNT,
    });

    await expect(
      fetchChargesInRange(DAY_RANGE)
    ).resolves.toEqual([
      USD_CARD_MOVEMENT,
      CRC_SINPE_MOVEMENT,
    ]);
  });

  it("returns an empty array when the range holds no charge", async () => {
    ChargesQueryPage.respondingWith({
      data: [],
      error: null,
      count: 0,
    });

    await expect(
      fetchChargesInRange(DAY_RANGE)
    ).resolves.toEqual([]);
  });

  it("throws a ChargesTruncatedError when fewer rows arrive than the range holds", async () => {
    ChargesQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: null,
      count: MORE_ROWS_THAN_RETURNED,
    });

    await expect(
      fetchChargesInRange(DAY_RANGE)
    ).rejects.toBeInstanceOf(ChargesTruncatedError);
  });

  it("throws a SupabaseQueryError when the query fails", async () => {
    ChargesQueryPage.respondingWith({
      data: BOTH_ROWS,
      error: POSTGREST_ERROR,
      count: null,
    });

    await expect(
      fetchChargesInRange(DAY_RANGE)
    ).rejects.toBeInstanceOf(SupabaseQueryError);
  });
});
