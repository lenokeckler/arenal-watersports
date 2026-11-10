import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_UI_COPY } from "./ReservationFormUiCopy.constants";

export const RESERVATION_FORM_SUBMISSION_DEFAULTS = {
  submitAction: createReservationAction,
  submitErrorCopy: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
};
