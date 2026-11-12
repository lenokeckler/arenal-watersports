import { updateReservationAction } from "../actions/updateReservationAction";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import type { ReservationEdit } from "../models/ReservationEdit.interface";
import { buildReservationEditFormStart } from "../utils/buildReservationEditFormStart";
import { useReservationDuration } from "./useReservationDuration";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";

export const useReservationEditForm = (
  reservation: ReservationEdit
) => {
  const formStart =
    buildReservationEditFormStart(reservation);
  const submission = useReservationFormSubmission({
    submitAction: (values) =>
      updateReservationAction({
        ...values,
        expectedUpdatedAt: reservation.lastEditedAt,
        reservationId: reservation.id,
      }),
    submitErrorCopy: RESERVATION_EDIT_COPY.SUBMIT_ERROR,
  });
  const fields = useReservationFormFields(
    reservation.date,
    formStart.values.categoryId,
    submission.clearFieldError,
    {
      initialValues: formStart.values,
      keepsUnitOnScheduleChange: true,
    }
  );
  const duration = useReservationDuration(
    fields.handleDurationChange,
    submission.clearFieldError,
    formStart.customDurationDraft
  );

  return {
    duration,
    durationHours: duration.resolveDurationHours(
      fields.values.durationHours
    ),
    fields,
    submission,
  };
};
