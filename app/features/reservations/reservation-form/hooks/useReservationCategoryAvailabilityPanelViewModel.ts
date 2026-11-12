import { STRING } from "@/app/constants";
import { useState } from "react";
import type { ReservationCategoryAvailabilityPanelViewModel } from "../models/ReservationCategoryAvailabilityPanelViewModel.interface";
import type { ReservationCategoryAvailabilityPanelViewModelInput } from "../models/ReservationCategoryAvailabilityPanelViewModelInput.interface";
import { getReservationIntervalLabel } from "../utils/getReservationIntervalLabel";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import { resolveCategoryAvailabilityPanelState } from "../utils/resolveCategoryAvailabilityPanelState";
import { useReservationCategoryAvailability } from "./useReservationCategoryAvailability";

export const useReservationCategoryAvailabilityPanelViewModel =
  (
    input: ReservationCategoryAvailabilityPanelViewModelInput
  ): ReservationCategoryAvailabilityPanelViewModel => {
    const [localRefreshKey, setLocalRefreshKey] =
      useState(0);
    const query = useReservationCategoryAvailability(
      input.request,
      input.refreshKey + localRefreshKey
    );
    const freeEquipmentCount =
      query.availability?.free ?? null;
    const isValidInterval =
      isReservationUnitAvailabilityInput(input.request);

    return {
      categoryAvailability: freeEquipmentCount,
      categoryAvailabilityCategoryName:
        input.category?.name ?? STRING.Empty,
      categoryAvailabilityInterval:
        getReservationIntervalLabel(input.request),
      categoryAvailabilityState:
        resolveCategoryAvailabilityPanelState({
          availability: freeEquipmentCount,
          categoryId: input.request.categoryId,
          hasError: query.hasError,
          isLoading: query.isLoading,
          isValidInterval,
        }),
      handleRetryCategoryAvailability: () =>
        setLocalRefreshKey((currentKey) => currentKey + 1),
    };
  };
