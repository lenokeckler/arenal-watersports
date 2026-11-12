import {
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
import type { ReservationCategoryAvailabilityRefreshProps } from "./models/ReservationCategoryAvailabilityRefreshProps.interface";

vi.mock(
  "../actions/getReservationCategoryAvailabilityAction",
  () => ({
    getReservationCategoryAvailabilityAction: vi.fn(),
  })
);

describe("useReservationCategoryAvailability refresh", () => {
  beforeEach(() => vi.clearAllMocks());

  it("refetches the same interval when its refresh key changes", async () => {
    vi.mocked(
      getReservationCategoryAvailabilityAction
    ).mockResolvedValue(
      RESERVATION_CATEGORY_AVAILABILITY_ROW
    );
    const { rerender } = renderHook(
      ({
        refreshKey,
      }: ReservationCategoryAvailabilityRefreshProps) =>
        useReservationCategoryAvailability(
          RESERVATION_CATEGORY_AVAILABILITY_INPUT,
          refreshKey
        ),
      { initialProps: { refreshKey: 0 } }
    );
    await waitFor(() =>
      expect(
        getReservationCategoryAvailabilityAction
      ).toHaveBeenCalledOnce()
    );

    rerender({ refreshKey: 1 });

    await waitFor(() =>
      expect(
        getReservationCategoryAvailabilityAction
      ).toHaveBeenCalledTimes(2)
    );
    expect(
      getReservationCategoryAvailabilityAction
    ).toHaveBeenLastCalledWith(
      RESERVATION_CATEGORY_AVAILABILITY_INPUT
    );
  });
});
