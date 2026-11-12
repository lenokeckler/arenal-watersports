import {
  PATHS,
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
  RESERVATION_HISTORY_STATUS,
} from "@/app/constants";
import type { ReservationHistoryRecord } from "@/app/services/board/reservation-history/models/ReservationHistoryRecord.interface";
import { HISTORY_FULL_FILTERS as FILTERS } from "@/app/services/board/reservation-history/tests/ReservationHistory.constants";
import { FORMAT_INSTANTS } from "./ReservationHistoryDateFormat.constants";
import { HREF_FULL_QUERY_STRING } from "./ReservationHistoryHref.constants";

export const DETAIL_CLOSED_RECORD: ReservationHistoryRecord =
  {
    cancellationReason: null,
    createdBy: {
      at: FORMAT_INSTANTS.AFTERNOON,
      name: "Marta Solano",
    },
    customerName: "Ana Mora",
    equipmentNames: ["Kayak", "Paddle board"],
    guideNames: ["Diego Rojas", "Lucia Vega"],
    id: "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10",
    startsAt: FORMAT_INSTANTS.AFTERNOON,
    status: RESERVATION_HISTORY_STATUS.CLOSED,
    updatedBy: {
      at: FORMAT_INSTANTS.AT_COSTA_RICA_MIDNIGHT,
      name: "Pedro Alfaro",
    },
  };

export const DETAIL_CANCELLED_REASON = "Cliente enfermo";

export const DETAIL_CANCELLED_RECORD: ReservationHistoryRecord =
  {
    ...DETAIL_CLOSED_RECORD,
    cancellationReason: DETAIL_CANCELLED_REASON,
    equipmentNames: [],
    guideNames: [],
    status: RESERVATION_HISTORY_STATUS.CANCELLED,
  };

export const DETAIL_LONG_REASON =
  "Cancelada por mal clima en el lago ".repeat(12).trim();

export const DETAIL_TRUNCATION_CLASS_PATTERN =
  /truncate|line-clamp|text-ellipsis/;

export const DETAIL_SEARCH_PARAMS = {
  [PARAM.CATEGORY]: FILTERS.categoryId,
  [PARAM.FROM]: FILTERS.from,
  [PARAM.TO]: FILTERS.to,
  [PARAM.TYPE]: FILTERS.type,
  page: "3",
} as const;

export const DETAIL_BACK_HREF = `${PATHS.HISTORY.ROOT}?${HREF_FULL_QUERY_STRING}`;

export const DETAIL_NOT_FOUND_SIGNAL = "NEXT_NOT_FOUND";
