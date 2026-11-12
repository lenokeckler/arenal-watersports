import { act, waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";
import { syncReservationCategoryAvailability } from "../utils/syncReservationCategoryAvailability";
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

const mockOutOfOrderAvailabilityResponses = () => {
  const older =
    createDeferred<
      typeof RESERVATION_CATEGORY_AVAILABILITY_ROW
    >();
  const newestRow = {
    ...RESERVATION_CATEGORY_AVAILABILITY_ROW,
    free: 7,
  };
  const newest = createDeferred<typeof newestRow>();
  vi.mocked(getReservationCategoryAvailabilityAction)
    .mockReturnValueOnce(older.promise)
    .mockReturnValueOnce(newest.promise);

  return { newest, newestRow, older };
};

describe("useReservationCategoryAvailability concurrency", () => {
  beforeEach(() => vi.clearAllMocks());

  it("keeps the newer result when an older response finishes later", async () => {
    const { newest, newestRow, older } =
      mockOutOfOrderAvailabilityResponses();
    const { rerender, result } =
      renderReservationCategoryAvailabilityHook(
        RESERVATION_CATEGORY_AVAILABILITY_INPUT
      );

    rerender({
      request: {
        ...RESERVATION_CATEGORY_AVAILABILITY_INPUT,
        time: "11:00",
      },
    });
    await waitFor(() =>
      expect(
        getReservationCategoryAvailabilityAction
      ).toHaveBeenCalledTimes(2)
    );
    await act(async () => {
      newest.resolve(newestRow);
      await newest.promise;
    });
    await act(async () => {
      older.resolve(RESERVATION_CATEGORY_AVAILABILITY_ROW);
      await older.promise;
    });

    expect(result.current.availability).toEqual(newestRow);
  });

  it("ignores a pending response after synchronization cleanup", async () => {
    const pending =
      createDeferred<
        typeof RESERVATION_CATEGORY_AVAILABILITY_ROW
      >();
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockReturnValue(pending.promise);
    const setAvailability = vi.fn();
    const setIsLoading = vi.fn();
    const setHasError = vi.fn();
    const cleanup = syncReservationCategoryAvailability({
      input: RESERVATION_CATEGORY_AVAILABILITY_INPUT,
      setAvailability,
      setHasError,
      setIsLoading,
    });
    cleanup();
    await act(async () => {
      pending.resolve(
        RESERVATION_CATEGORY_AVAILABILITY_ROW
      );
      await pending.promise;
    });

    expect(setAvailability).toHaveBeenCalledOnce();
    expect(setAvailability).toHaveBeenCalledWith(null);
    expect(setIsLoading).toHaveBeenCalledOnce();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setHasError).toHaveBeenCalledOnce();
    expect(setHasError).toHaveBeenCalledWith(false);
  });
});
