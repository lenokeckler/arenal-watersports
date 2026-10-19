import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { createReservationGuideAssignmentPage } from "./ReservationGuideAssignment.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_TEST } from "./ReservationGuideSelection.constants";

export const renderReservationGuideForm = (
  guideLoadResult: ReservationGuideLoadResult = {
    guides: [
      {
        id: RESERVATION_GUIDE_SELECTION_TEST.FIRST_ID,
        name: RESERVATION_GUIDE_ASSIGNMENT_TEST.FIRST_NAME,
      },
      {
        id: RESERVATION_GUIDE_SELECTION_TEST.SECOND_ID,
        name: RESERVATION_GUIDE_ASSIGNMENT_TEST.SECOND_NAME,
      },
    ],
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
  }
) => {
  const page = renderReservationForm(guideLoadResult);
  return {
    ...page,
    ...createReservationGuideAssignmentPage(document.body),
  };
};
