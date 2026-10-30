"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[]
): ReservationFormViewModel => {
  const { handleSubmit, resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state } = resources;
  return {
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...state.durationHandlers,
    ...resources.equipment,
    handleBack: router.back,
    handleSubmit,
  };
};
