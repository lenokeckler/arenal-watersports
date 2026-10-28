import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { fetchChargesInRange } from "../fetchChargesInRange";
import { fetchDailyIncome } from "../fetchDailyIncome";
import {
  EXPECTED_MIXED_DAY,
  EXPECTED_TODAY_RANGE,
  NOW_IN_COSTA_RICA_EVENING,
} from "./DailyIncome.constants";
import { MIXED_CURRENCIES } from "./Income.constants";

vi.mock("../fetchChargesInRange", () => ({
  fetchChargesInRange: vi.fn(),
}));

describe("fetchDailyIncome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchChargesInRange).mockResolvedValue(
      MIXED_CURRENCIES
    );
  });

  it("reads the charges of the Costa Rica day containing now", async () => {
    await fetchDailyIncome(NOW_IN_COSTA_RICA_EVENING);

    expect(fetchChargesInRange).toHaveBeenCalledWith(
      EXPECTED_TODAY_RANGE
    );
  });

  it("returns the Costa Rica date with the income of each currency", async () => {
    await expect(
      fetchDailyIncome(NOW_IN_COSTA_RICA_EVENING)
    ).resolves.toEqual(EXPECTED_MIXED_DAY);
  });

  it("propagates a failed read instead of reporting no income", async () => {
    vi.mocked(fetchChargesInRange).mockRejectedValue(
      new Error()
    );

    await expect(
      fetchDailyIncome(NOW_IN_COSTA_RICA_EVENING)
    ).rejects.toBeInstanceOf(Error);
  });
});
