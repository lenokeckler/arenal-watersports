"use client";

import { STRING } from "@/app/constants";
import { useRouter } from "next/navigation";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import { useReservationFormState } from "./useReservationFormState";
import { useReservationFormEquipmentViewModel } from "./useReservationFormEquipmentViewModel";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[]
): ReservationFormViewModel => {
  const router = useRouter();
  const state = useReservationFormState(
    initialDate,
    STRING.Empty,
    categories
  );
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const equipment = useReservationFormEquipmentViewModel(
    categories,
    state.fields,
    resolvedDurationHours
  );
  const handleSubmit = createReservationFormSubmitHandler({
    ...equipment,
    resolvedDurationHours,
    setFieldError: state.submission.setFieldError,
    submitReservation: state.submission.submitReservation,
    values: state.fields.values,
  });

  return {
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...state.durationHandlers,
    handleBack: router.back,
    handleSubmit,
    ...equipment,
  };
};
