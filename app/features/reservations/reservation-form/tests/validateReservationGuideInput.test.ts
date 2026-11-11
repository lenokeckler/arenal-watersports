import { describe, expect, it } from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { VALID_RESERVATION_FORM_INPUT } from "./validateReservationFormInput.constants";
import { RESERVATION_GUIDE_SELECTION_IDS } from "./ReservationGuideSelection.constants";

describe("validateReservationFormInput guide selection", () => {
  it("preserves guide identifiers for tours and clears them for rentals", () => {
    const tourResult = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      guideIds: RESERVATION_GUIDE_SELECTION_IDS,
      reservationType: RESERVATION_TYPE.TOUR,
    });
    const rentalResult = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      guideIds: RESERVATION_GUIDE_SELECTION_IDS,
    });

    expect(tourResult.value?.guideIds).toEqual(
      RESERVATION_GUIDE_SELECTION_IDS
    );
    expect(rentalResult.value?.guideIds).toEqual([]);
  });
});
