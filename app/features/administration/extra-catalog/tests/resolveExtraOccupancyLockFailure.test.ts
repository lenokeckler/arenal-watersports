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
import { fetchExtraOccupancy } from "../services/fetchExtraOccupancy";
import { isExtraUsedInReservations } from "../services/isExtraUsedInReservations";
import { resolveExtraOccupancyLockFailure } from "../services/resolveExtraOccupancyLockFailure";
import { FAKE_EXTRA_ID } from "./Extra.constants";
import {
  CHARGE_ONLY_COLUMNS,
  OCCUPYING_COLUMNS,
} from "./ExtraOccupancy.constants";

vi.mock("../services/fetchExtraOccupancy", () => ({
  fetchExtraOccupancy: vi.fn(),
}));

vi.mock("../services/isExtraUsedInReservations", () => ({
  isExtraUsedInReservations: vi.fn(),
}));

const FAKE_SUPABASE = {} as ServerSupabaseClient;

const resolveFailure = (
  nextColumns = OCCUPYING_COLUMNS
): ReturnType<typeof resolveExtraOccupancyLockFailure> =>
  resolveExtraOccupancyLockFailure(
    FAKE_SUPABASE,
    FAKE_EXTRA_ID,
    nextColumns
  );

describe("resolveExtraOccupancyLockFailure", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(fetchExtraOccupancy).mockResolvedValue(
      CHARGE_ONLY_COLUMNS
    );
    vi.mocked(isExtraUsedInReservations).mockResolvedValue(
      true
    );
  });

  it("refuses a changed occupancy on an extra a reservation uses", async () => {
    expect(await resolveFailure()).toEqual({
      status: EXTRA_MUTATION_STATUS.ERROR,
      occupancyError: EXTRA_OCCUPANCY_COPY.LOCKED_ERROR,
    });
  });

  it("allows a changed occupancy on an unused extra", async () => {
    vi.mocked(isExtraUsedInReservations).mockResolvedValue(
      false
    );

    expect(await resolveFailure()).toBeNull();
  });

  it("allows the same occupancy on a used extra without looking for reservations", async () => {
    expect(
      await resolveFailure(CHARGE_ONLY_COLUMNS)
    ).toBeNull();
    expect(
      isExtraUsedInReservations
    ).not.toHaveBeenCalled();
  });

  it("leaves a missing extra to the update", async () => {
    vi.mocked(fetchExtraOccupancy).mockResolvedValue(null);

    expect(await resolveFailure()).toBeNull();
  });
});
