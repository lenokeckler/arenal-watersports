import {
  PATHS,
  RESERVATION_HISTORY_STATUS,
} from "@/app/constants";
import type { ReservationHistoryItem } from "@/app/services/board/reservation-history/models/ReservationHistoryItem.interface";
import type { ReservationHistoryPage } from "@/app/services/board/reservation-history/models/ReservationHistoryPage.interface";
import {
  HISTORY_FULL_FILTERS,
  HISTORY_REQUESTED_PAGE_INDEX,
} from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";
import { FORMAT_INSTANTS } from "./ReservationHistoryDateFormat.constants";

export const CLOSED_ITEM: ReservationHistoryItem = {
  attendedByName: "Marta Solano",
  customerName: "Ana Mora",
  equipmentNames: ["Kayak", "Paddle board"],
  guideNames: ["Diego Rojas", "Lucia Vega"],
  id: "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10",
  startsAt: FORMAT_INSTANTS.AFTERNOON,
  status: RESERVATION_HISTORY_STATUS.CLOSED,
};

export const CANCELLED_ITEM: ReservationHistoryItem = {
  ...CLOSED_ITEM,
  customerName: "Luis Vargas",
  equipmentNames: [],
  guideNames: [],
  id: "7a1d9c30-5e44-4f0b-8a6e-91d2b3c4e5f6",
  status: RESERVATION_HISTORY_STATUS.CANCELLED,
};

export const HISTORY_QUERY = {
  filters: HISTORY_FULL_FILTERS,
  pageIndex: HISTORY_REQUESTED_PAGE_INDEX,
} as const;

export const buildPage = (
  items: readonly ReservationHistoryItem[]
): ReservationHistoryPage => ({
  items,
  pageCount: 1,
  pageIndex: 0,
  totalCount: items.length,
});

export const CLOSED_ITEM_HREF = `${PATHS.HISTORY.ROOT}/${CLOSED_ITEM.id}?from=2026-10-01&to=2026-10-31&type=tour&category=${HISTORY_FULL_FILTERS.categoryId}&page=4`;
export const EQUIPMENT_TEXT = "Kayak, Paddle board";
export const GUIDES_TEXT = "Diego Rojas, Lucia Vega";
export const CURRENCY_SIGN_PATTERN = /[$₡]/;
