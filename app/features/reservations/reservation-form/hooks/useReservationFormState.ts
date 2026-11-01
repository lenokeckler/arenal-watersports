import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";

export const useReservationFormState = (
  initialDate: string,
  initialCategoryId: string
) => {
  const submission = useReservationFormSubmission();
  const fields = useReservationFormFields(
    initialDate,
    initialCategoryId,
    submission.clearFieldError
  );
  const duration = useReservationDuration(
    fields.handleDurationChange,
    submission.clearFieldError
  );

  const durationHandlers = {
    handleCustomDurationChange:
      duration.updateCustomDurationDraft,
    handleCustomDurationSelection:
      duration.selectCustomDuration,
    handleDurationChange: duration.selectPreset,
  };
  return { duration, durationHandlers, fields, submission };
};
