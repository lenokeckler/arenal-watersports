"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { useRouter } from "next/navigation";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";

export const useReservationFormViewModel = (
  initialDate: string,
  initialCategoryId: string
): ReservationFormViewModel => {
  const router = useRouter();
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
  const handleSubmit: ReservationFormViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      submission.submitReservation({
        ...fields.values,
        durationHours: duration.resolveDurationHours(
          fields.values.durationHours
        ),
      });
    };
  return {
    ...fields,
    ...submission,
    customDurationDraft: duration.customDurationDraft,
    handleCustomDurationChange:
      duration.updateCustomDurationDraft,
    handleCustomDurationSelection:
      duration.selectCustomDuration,
    handleDurationChange: duration.selectPreset,
    handleBack: router.back,
    isCustomDuration: duration.isCustomDuration,
    handleSubmit,
  };
};
