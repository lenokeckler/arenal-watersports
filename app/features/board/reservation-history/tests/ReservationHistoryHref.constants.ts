import { RESERVATION_TYPE } from "@/app/constants";
import {
  HISTORY_EMPTY_FILTERS,
  HISTORY_FULL_FILTERS,
} from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";

export const HREF_EMPTY_QUERY = {
  filters: HISTORY_EMPTY_FILTERS,
  pageIndex: 0,
} as const;

export const HREF_FULL_QUERY = {
  filters: HISTORY_FULL_FILTERS,
  pageIndex: 2,
} as const;

export const HREF_FULL_QUERY_STRING = `from=${HISTORY_FULL_FILTERS.from}&to=${HISTORY_FULL_FILTERS.to}&type=${RESERVATION_TYPE.TOUR}&category=${HISTORY_FULL_FILTERS.categoryId}&page=3`;

export const HREF_FIRST_PAGE_QUERY = {
  filters: {
    ...HISTORY_EMPTY_FILTERS,
    type: RESERVATION_TYPE.RENTAL,
  },
  pageIndex: 0,
} as const;

export const HREF_FIRST_PAGE_QUERY_STRING = `type=${RESERVATION_TYPE.RENTAL}`;

export const HREF_PAGE_ONLY_QUERY = {
  filters: HISTORY_EMPTY_FILTERS,
  pageIndex: 1,
} as const;

export const HREF_PAGE_ONLY_QUERY_STRING = "page=2";

export const HREF_RECORD_ID =
  "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10";

export const HREF_ROOT = "/history";
