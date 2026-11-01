import { STRING } from "@/app/constants";
import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";
import type { CategoryAvailabilityPanelStateInput } from "../models/CategoryAvailabilityPanelStateInput.interface";
import type { ReservationCategoryAvailabilityPanelState } from "../models/ReservationCategoryAvailabilityPanelState.type";

export const resolveCategoryAvailabilityPanelState = (
  input: CategoryAvailabilityPanelStateInput
): ReservationCategoryAvailabilityPanelState => {
  if (
    input.categoryId === STRING.Empty ||
    !input.isValidInterval
  ) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.INACTIVE;
  }
  if (input.isLoading) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING;
  }
  if (input.hasError) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.ERROR;
  }
  if (input.availability === null) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.LOADING;
  }
  if (input.availability < 0) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.OVERCOMMITTED;
  }
  if (input.availability === 0) {
    return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.UNAVAILABLE;
  }
  return RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE.AVAILABLE;
};
