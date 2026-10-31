"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { useRouter } from "next/navigation";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { STRING } from "@/app/constants";
import type { ReservationFormViewModelOptions } from "../models/ReservationFormViewModelOptions.interface";

export const useReservationFormViewModel = (
  options: ReservationFormViewModelOptions
): ReservationFormViewModel => {
  const {
    categories,
    initialCategoryId,
    initialDate,
    unitCategories,
  } = options;
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
  const equipment = useReservationEquipmentViewModel(
    unitCategories,
    fields.values,
    duration.resolveDurationHours(
      fields.values.durationHours
    )
  );
  const isSubmitDisabled =
    submission.isPending ||
    submission.isSubmitted ||
    categories.length === 0 ||
    (equipment.requiresConcreteUnit &&
      (equipment.isAvailabilityLoading ||
        equipment.hasAvailabilityError ||
        fields.values.unitId === STRING.Empty));
  const handleSubmit: ReservationFormViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      submission.submitReservation(
        {
          ...fields.values,
          durationHours: duration.resolveDurationHours(
            fields.values.durationHours
          ),
        },
        () => {
          fields.handleUnitChange(STRING.Empty);
          equipment.retryUnitAvailability();
        }
      );
    };
  return {
    ...fields,
    ...submission,
    ...equipment,
    isSubmitDisabled,
    customDurationDraft: duration.customDurationDraft,
    handleCustomDurationSelection: () => {
      duration.selectCustomDuration();
      fields.handleUnitChange(STRING.Empty);
    },
    handleCustomDurationChange: (value: string) => {
      duration.updateCustomDurationDraft(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleDurationChange: (value: number) => {
      duration.selectPreset(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleBack: router.back,
    isCustomDuration: duration.isCustomDuration,
    handleSubmit,
  };
};
