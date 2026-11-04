import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReservationFormViewModel } from "../hooks/useReservationFormViewModel";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn() }),
}));

describe("useReservationFormViewModel concrete unit selection", () => {
  it("requires a unit for a concrete equipment category", () => {
    const { result } = renderHook(() =>
      useReservationFormViewModel({
        categories: [
          {
            id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
            name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
          },
        ],
        initialCategoryId: "",
        initialDate: RESERVATION_FORM_VIEW_TEST.DATE,
        unitCategories: [
          {
            id: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID,
            name: RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME,
          },
        ],
      })
    );

    act(() =>
      result.current.handleCategoryChange(
        RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
      )
    );

    expect(result.current.requiresConcreteUnit).toBe(true);
  });
});
