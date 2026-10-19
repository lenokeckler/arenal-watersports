import { RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE } from "../constants/ReservationCategoryAvailabilityPanelState.constants";

export type ReservationCategoryAvailabilityPanelState =
  (typeof RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE)[keyof typeof RESERVATION_CATEGORY_AVAILABILITY_PANEL_STATE];
