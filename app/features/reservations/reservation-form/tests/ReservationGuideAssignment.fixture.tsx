import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { createReservationGuideAssignmentPage } from "./ReservationGuideAssignment.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_GUIDE_ASSIGNMENT_TEST } from "./ReservationGuideAssignment.constants";
import { RESERVATION_GUIDE_SELECTION_OPTIONS } from "./ReservationGuideSelection.constants";

export const createFailedGuideLoadResult =
  (): ReservationGuideLoadResult => ({
    code: RESERVATION_GUIDE_ASSIGNMENT_TEST.LOAD_ERROR_CODE,
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.FAILURE,
  });

export const renderReservationGuideForm = (
  guideLoadResult: ReservationGuideLoadResult = {
    guides: RESERVATION_GUIDE_SELECTION_OPTIONS,
    kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
  }
) => {
  const page = renderReservationForm(
    true,
    false,
    false,
    guideLoadResult
  );
  return {
    ...page,
    ...createReservationGuideAssignmentPage(document.body),
  };
};
