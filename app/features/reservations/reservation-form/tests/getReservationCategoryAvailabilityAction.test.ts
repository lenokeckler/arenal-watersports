import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryAvailability } from "../services/getReservationCategoryAvailability";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import {
  RESERVATION_CATEGORY_AVAILABILITY_INPUT,
  RESERVATION_CATEGORY_AVAILABILITY_ROW,
} from "./getReservationInterval.constants";

vi.mock(
  "../services/getReservationCategoryAvailability",
  () => ({
    getReservationCategoryAvailability: vi.fn(),
  })
);

describe("getReservationCategoryAvailabilityAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects an unknown payload before calling the service", async () => {
    await expect(
      getReservationCategoryAvailabilityAction({
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        durationMinutes: -1,
      })
    ).rejects.toThrow("Invalid reservation category");

    expect(
      getReservationCategoryAvailability
    ).not.toHaveBeenCalled();
  });

  it("passes a valid availability request to the service", async () => {
    vi.mocked(
      getReservationCategoryAvailability
    ).mockResolvedValue(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );

    await expect(
      getReservationCategoryAvailabilityAction(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      )
    ).resolves.toEqual(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
    expect(
      getReservationCategoryAvailability
    ).toHaveBeenCalledWith(
      RESERVATION_CATEGORY_AVAILABILITY_INPUT
    );
  });
});
