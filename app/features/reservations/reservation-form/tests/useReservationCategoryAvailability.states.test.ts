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

describe("useReservationCategoryAvailability states", () => {
  beforeEach(() => vi.clearAllMocks());

  it("exposes loading then the interval result", async () => {
    const pending =
      createDeferred<
        typeof RESERVATION_CATEGORY_AVAILABILITY_ROW
      >();
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockReturnValue(pending.promise);
    const { result } = renderHook(() =>
      useReservationCategoryAvailability(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        0
      )
    );

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

    expect(result.current.availability).toEqual(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it("exposes action failures separately from unavailable stock", async () => {
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockRejectedValue(new Error("Network unavailable"));
    const { result } = renderHook(() =>
      useReservationCategoryAvailability(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        0
      )
    );

    await waitFor(() =>
      expect(result.current.hasError).toBe(true)
    );

    expect(result.current.availability).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("clears prior availability when the interval becomes invalid", async () => {
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue(
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
    await waitFor(() =>
      expect(result.current.availability).toEqual(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      )
    );

    rerender({
      request: {
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        categoryId: "",
      },
    });

    await waitFor(() =>
      expect(result.current.availability).toBeNull()
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });
});
