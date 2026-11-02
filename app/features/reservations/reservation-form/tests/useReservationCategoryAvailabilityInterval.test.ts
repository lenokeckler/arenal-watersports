import { act, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import {
  RESERVATION_CATEGORY_AVAILABILITY_INPUT,
  RESERVATION_CATEGORY_AVAILABILITY_ROW,
} from "./getReservationInterval.constants";
import { createDeferred } from "./reservationAvailability.testHarness";
import { renderReservationCategoryAvailabilityHook } from "./ReservationCategoryAvailability.testHarness";

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi.fn(),
  })
);

describe("useReservationCategoryAvailability interval", () => {
  beforeEach(() => vi.clearAllMocks());

  it("clears the old result while loading a changed interval", async () => {
    const pending =
      createDeferred<
        typeof RESERVATION_CATEGORY_AVAILABILITY_ROW
      >();
    vi.mocked(getReservationCategoryAvailabilityAction)
      .mockResolvedValueOnce(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      )
      .mockReturnValueOnce(pending.promise);
    const { rerender, result } =
      renderReservationCategoryAvailabilityHook(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      );
    await waitFor(() =>
      expect(result.current.availability).toEqual(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      )
    );

    rerender({
      request: {
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        time: "11:00",
      },
    });

    await waitFor(() =>
      expect(result.current.isLoading).toBe(true)
    );
    expect(result.current.availability).toBeNull();
    await act(async () => {
      pending.resolve(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      );
      await pending.promise;
    });
  });
});
