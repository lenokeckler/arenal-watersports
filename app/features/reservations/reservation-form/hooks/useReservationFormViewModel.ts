"use client";

import { STRING } from "@/app/constants";
import { useRouter } from "next/navigation";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { useReservationFormState } from "./useReservationFormState";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[]
): ReservationFormViewModel => {
  const router = useRouter();
  const state = useReservationFormState(
    initialDate,
    STRING.Empty
  );
  const resolvedDurationHours =
    state.duration.resolveDurationHours(
      state.fields.values.durationHours
    );
  const equipment = useReservationEquipmentViewModel(
    categories,
    state.fields.values,
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
    ...equipment,
    ...state.durationHandlers,
    handleBack: router.back,
    handleSubmit,
  };
};
