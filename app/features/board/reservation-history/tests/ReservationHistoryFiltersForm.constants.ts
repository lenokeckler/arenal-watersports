import { API } from "@/app/constants";
import type { ReservationHistoryCategoryOption } from "@/app/services/board/reservation-history/models/ReservationHistoryCategoryOption.interface";
import { HISTORY_FULL_FILTERS } from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";

export const FILTER_ACTIVE_CATEGORY: ReservationHistoryCategoryOption =
  {
    id: HISTORY_FULL_FILTERS.categoryId,
    name: "Kayak",
  };

export const FILTER_INACTIVE_CATEGORY: ReservationHistoryCategoryOption =
  {
    id: "c3a9d2f4-8b17-4e60-b5a1-6d0e7f2a9c14",
    name: "Moto acuática",
  };

export const FILTER_CATEGORY_OPTIONS = [
  FILTER_ACTIVE_CATEGORY,
  FILTER_INACTIVE_CATEGORY,
] as const;

export const FORM_METHOD_GET = API.METHODS.GET;
export const METHOD_ATTRIBUTE = "method";
export const ACTION_ATTRIBUTE = "action";
export const DESCRIBED_BY_ATTRIBUTE = "aria-describedby";
export const INVALID_ATTRIBUTE = "aria-invalid";
export const INVALID_TRUE_VALUE = "true";

export const FILTER_UNLISTED_CATEGORY_ID =
  "0f6b1c2d-3e4a-4b5c-8d7e-9a0b1c2d3e4f";
