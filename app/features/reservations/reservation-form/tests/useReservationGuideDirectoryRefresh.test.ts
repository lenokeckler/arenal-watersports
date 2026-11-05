import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import {
  resetViewModelHarness,
  viewModelHarness,
} from "./ReservationFormViewModel.testHarness";
import { useReservationFormViewModel } from "../hooks/useReservationFormViewModel";

describe("reservation guide directory refresh", () => {
  beforeEach(resetViewModelHarness);

  it("reconciles selected guides when a refreshed directory omits one", () => {
    const firstGuide = {
      id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
      name: RESERVATION_GUIDE_SELECTION_TEST.FIRST_NAME,
    };
    const secondGuide = {
      id: RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID,
      name: RESERVATION_GUIDE_SELECTION_TEST.SECOND_NAME,
    };
    const { rerender } = renderHook(
      ({ guideOptions }) =>
        useReservationFormViewModel(
          RESERVATION_FORM_VIEW_TEST.DATE,
          [],
          guideOptions
        ),
      {
        initialProps: {
          guideOptions: [firstGuide, secondGuide],
        },
      }
    );

    expect(
      viewModelHarness.reconcileGuideSelection
    ).toHaveBeenLastCalledWith([
      RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
      RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID,
    ]);

    rerender({ guideOptions: [firstGuide] });

    expect(
      viewModelHarness.reconcileGuideSelection
    ).toHaveBeenLastCalledWith([
      RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
    ]);
  });
});
