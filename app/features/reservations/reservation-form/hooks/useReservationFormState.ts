import { STRING } from "@/app/constants";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const useReservationFormState = (
  initialDate: string,
  initialCategoryId: string,
  categories: ReservationCategoryOption[]
) => {
  const submission = useReservationFormSubmission();
  const fields = useReservationFormFields(
    initialDate,
    initialCategoryId,
    submission.clearFieldError,
    categories
  );
  const duration = useReservationDuration(
    fields.handleDurationChange,
    submission.clearFieldError,
    () => fields.handleUnitChange(STRING.Empty)
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
