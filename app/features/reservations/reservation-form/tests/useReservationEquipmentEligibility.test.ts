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
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationEquipmentEligibilityRealtimeOptions } from "../models/ReservationEquipmentEligibilityRealtimeOptions.interface";
import { getReservationCategoriesAction } from "../actions/getReservationCategoriesAction";
import { useReservationEquipmentEligibility } from "../hooks/useReservationEquipmentEligibility";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const realtimeHandlers = vi.hoisted(() => ({
  current:
    null as null | ReservationEquipmentEligibilityRealtimeOptions,
}));

vi.mock(
  "../actions/getReservationCategoriesAction",
  () => ({
    getReservationCategoriesAction: vi.fn(),
  })
);

vi.mock(
  "../hooks/useReservationEquipmentEligibilityRealtime",
  () => ({
    useReservationEquipmentEligibilityRealtime: vi.fn(
      (
        options: ReservationEquipmentEligibilityRealtimeOptions
      ) => {
        realtimeHandlers.current = options;
      }
    ),
  })
);

describe("useReservationEquipmentEligibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    realtimeHandlers.current = null;
  });

  it("keeps the server snapshot usable across realtime disconnect and reconnect", async () => {
    const categories: ReservationCategoryOption[] = [
      {
        id: RESERVATION_FORM_VIEW_TEST.CATEGORY_ID,
        isInterchangeable: true,
        name: RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME,
      },
    ];
    const refreshedCategories = [
      {
        ...categories[0],
        name: RESERVATION_FORM_VIEW_TEST.REFRESHED_CATEGORY_NAME,
      },
    ];
    vi.mocked(
      getReservationCategoriesAction
    ).mockResolvedValue(refreshedCategories);
    const { result } = renderHook(() =>
      useReservationEquipmentEligibility(categories)
    );

    act(() => realtimeHandlers.current?.onUnavailable());
    expect(result.current.categories).toEqual(categories);
    expect(result.current.hasError).toBe(true);

    act(() => realtimeHandlers.current?.onSubscribed());
    await waitFor(() =>
      expect(result.current.isLoading).toBe(false)
    );

    expect(result.current.categories).toEqual(
      refreshedCategories
    );
    expect(result.current.hasError).toBe(false);
  });
});
