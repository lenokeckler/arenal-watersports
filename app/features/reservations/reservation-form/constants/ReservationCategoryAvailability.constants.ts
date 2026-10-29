import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";

export const EMPTY_RESERVATION_CATEGORY_AVAILABILITY: ReservationCategoryAvailability =
  {
    availableQuantity: 0,
    availableUnits: [],
    hasRequestedQuantity: false,
  };
