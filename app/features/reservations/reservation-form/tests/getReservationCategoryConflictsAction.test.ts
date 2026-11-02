import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryConflicts } from "../services/getReservationCategoryConflicts";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import {
  RESERVATION_CATEGORY_CONFLICT_INPUT,
  RESERVATION_CATEGORY_CONFLICT_ROW,
} from "./getReservationCategoryConflicts.constants";

vi.mock(
  "../services/getReservationCategoryConflicts",
  () => ({
    getReservationCategoryConflicts: vi.fn(),
  })
);

describe("getReservationCategoryConflictsAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects invalid input before calling the service", async () => {
    await expect(
      getReservationCategoryConflictsAction({
        ...RESERVATION_CATEGORY_CONFLICT_INPUT,
        durationMinutes: -1,
      })
    ).rejects.toThrow(
      "Invalid reservation category conflict input"
    );

    expect(
      getReservationCategoryConflicts
    ).not.toHaveBeenCalled();
  });

  it("passes valid input to the conflict service", async () => {
    vi.mocked(
      getReservationCategoryConflicts
    ).mockResolvedValue([
      RESERVATION_CATEGORY_CONFLICT_ROW,
    ]);

    await expect(
      getReservationCategoryConflictsAction(
        RESERVATION_CATEGORY_CONFLICT_INPUT
      )
    ).resolves.toEqual([RESERVATION_CATEGORY_CONFLICT_ROW]);
    expect(
      getReservationCategoryConflicts
    ).toHaveBeenCalledWith(
      RESERVATION_CATEGORY_CONFLICT_INPUT
    );
  });
});
