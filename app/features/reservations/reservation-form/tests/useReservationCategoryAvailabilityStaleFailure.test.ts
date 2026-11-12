import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { useReservationCategoryAvailability } from "../hooks/useReservationCategoryAvailability";
import {
  RESERVATION_CATEGORY_AVAILABILITY_INPUT,
  RESERVATION_CATEGORY_AVAILABILITY_ROW,
} from "./getReservationInterval.constants";
import { createDeferred } from "./reservationAvailability.testHarness";

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi.fn(),
  })
);

describe("useReservationCategoryAvailability stale failures", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ignores an obsolete failure after a newer interval succeeds", async () => {
    const older =
      createDeferred<
        typeof RESERVATION_CATEGORY_AVAILABILITY_ROW
      >();
    vi.mocked(getReservationCategoryAvailabilityAction)
      .mockReturnValueOnce(older.promise)
      .mockResolvedValueOnce(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      );
    const { rerender, result } = renderHook(
      ({ request }) =>
        useReservationCategoryAvailability(request, 0),
      {
        initialProps: {
          request: RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        },
      }
    );

    rerender({
      request: {
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        time: "11:00",
      },
    });
    await waitFor(() =>
      expect(result.current.availability).toEqual(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      )
    );
    await act(async () => {
      older.reject(new Error("Obsolete failure"));
      await older.promise.catch(() => undefined);
    });

    expect(result.current.hasError).toBe(false);
    expect(result.current.availability).toEqual(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
  });
});
