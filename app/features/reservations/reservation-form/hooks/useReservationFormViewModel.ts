"use client";

import { useEffect, useEffectEvent } from "react";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationGuideOption } from "../models/ReservationGuideOption.interface";
import { useReservationFormViewModelDependencies } from "./useReservationFormViewModelDependencies";

export const useReservationFormViewModel = (
  initialDate: string,
  categories: ReservationCategoryOption[],
  guideOptions: ReservationGuideOption[]
): ReservationFormViewModel => {
  const { handleSubmit, resources, router } =
    useReservationFormViewModelDependencies(
      initialDate,
      categories
    );
  const { state } = resources;
  const reconcileLoadedGuides = useEffectEvent(
    (guideIds: string[]) =>
      state.fields.reconcileGuideSelection(guideIds)
  );
  useEffect(() => {
    reconcileLoadedGuides(
      guideOptions.map((guide) => guide.id)
    );
  }, [guideOptions]);
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
