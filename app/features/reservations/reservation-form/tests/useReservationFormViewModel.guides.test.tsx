import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormViewModel } from "../hooks/useReservationFormViewModel";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import {
  RESERVATION_GUIDE_SELECTION_IDS,
  RESERVATION_GUIDE_SELECTION_OPTIONS,
} from "./ReservationGuideSelection.constants";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: vi.fn() }),
}));

describe("reservation guide selection refresh", () => {
  it("removes a selected guide when a refreshed directory omits it", () => {
    const { result, rerender } = renderHook(
      ({ guideOptions }) =>
        useReservationFormViewModel({
          categories: [],
          guideOptions,
          initialCategoryId: "",
          initialDate: RESERVATION_FORM_VIEW_TEST.DATE,
          unitCategories: [],
        }),
      {
        initialProps: {
          guideOptions: RESERVATION_GUIDE_SELECTION_OPTIONS,
        },
      }
    );

    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      )
    );
    act(() =>
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_IDS[0]
      )
    );
    act(() =>
      result.current.handleGuideToggle(
        RESERVATION_GUIDE_SELECTION_IDS[1]
      )
    );

    rerender({
      guideOptions: [
        RESERVATION_GUIDE_SELECTION_OPTIONS[0],
      ],
    });

    expect(result.current.values.guideIds).toEqual([
      RESERVATION_GUIDE_SELECTION_IDS[0],
    ]);
  });

  it("keeps multiple tour guides and clears them when leaving Tour", () => {
    const { result } = renderHook(() =>
      useReservationFormViewModel({
        categories: [],
        guideOptions: RESERVATION_GUIDE_SELECTION_OPTIONS,
        initialCategoryId: "",
        initialDate: RESERVATION_FORM_VIEW_TEST.DATE,
        unitCategories: [],
      })
    );

    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.TOUR
      )
    );
    for (const guideId of RESERVATION_GUIDE_SELECTION_IDS) {
      act(() => result.current.handleGuideToggle(guideId));
    }

    expect(result.current.values.guideIds).toEqual([
      ...RESERVATION_GUIDE_SELECTION_IDS,
    ]);

    act(() =>
      result.current.handleReservationTypeChange(
        RESERVATION_TYPE.RENTAL
      )
    );

    expect(result.current.values.guideIds).toEqual([]);
  });
});
