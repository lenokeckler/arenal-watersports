import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { isOccupiableCategory } from "../services/isOccupiableCategory";
import { resolveExtraCategoryFailure } from "../services/resolveExtraCategoryFailure";
import {
  CHARGE_ONLY_COLUMNS,
  OCCUPYING_COLUMNS,
} from "./ExtraOccupancy.constants";

vi.mock("../services/isOccupiableCategory", () => ({
  isOccupiableCategory: vi.fn(),
}));

const FAKE_SUPABASE = {} as ServerSupabaseClient;

describe("resolveExtraCategoryFailure", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(isOccupiableCategory).mockResolvedValue(true);
  });

  it("accepts an extra that occupies nothing without reading categories", async () => {
    expect(
      await resolveExtraCategoryFailure(
        FAKE_SUPABASE,
        CHARGE_ONLY_COLUMNS
      )
    ).toBeNull();
    expect(isOccupiableCategory).not.toHaveBeenCalled();
  });

  it("accepts an active category counted by quantity", async () => {
    expect(
      await resolveExtraCategoryFailure(
        FAKE_SUPABASE,
        OCCUPYING_COLUMNS
      )
    ).toBeNull();
  });

  it("refuses a category that cannot be occupied", async () => {
    vi.mocked(isOccupiableCategory).mockResolvedValue(
      false
    );

    expect(
      await resolveExtraCategoryFailure(
        FAKE_SUPABASE,
        OCCUPYING_COLUMNS
      )
    ).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      occupancyError: EXTRA_OCCUPANCY_COPY.CATEGORY_ERROR,
    });
  });
});
