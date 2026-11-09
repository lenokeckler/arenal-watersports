import {
  PAGINATION,
  RESERVATION_HISTORY_STATUS,
  RESERVATION_TYPE,
} from "@/app/constants";
import type { ReservationHistoryFilters } from "../models/ReservationHistoryFilters.interface";
import type { ReservationHistoryListRow } from "../models/ReservationHistoryListRow.type";
import type { ReservationHistoryRecordRow } from "../models/ReservationHistoryRecordRow.type";

export const HISTORY_EMPTY_FILTERS = {
  categoryId: null,
  from: null,
  to: null,
  type: null,
} as const satisfies ReservationHistoryFilters;

export const HISTORY_FULL_FILTERS = {
  categoryId: "5b2f0c9e-3d1a-4c55-9a53-0a8f6c1d7e21",
  from: "2026-10-01",
  to: "2026-10-31",
  type: RESERVATION_TYPE.TOUR,
} as const satisfies ReservationHistoryFilters;

export const HISTORY_REQUESTED_PAGE_INDEX = 3;

export const HISTORY_LIST_ROW = {
  created_by_name: "Marta Rojas",
  customer_name: "Laura Campos",
  equipment_names: ["Kayak", "Paddle board"],
  guide_names: ["Diego Solano"],
  id: "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10",
  page_index: 0,
  starts_at: "2026-10-30T15:00:00+00:00",
  status: RESERVATION_HISTORY_STATUS.CLOSED,
  total_count: PAGINATION.DEFAULT_PAGE_SIZE,
} as const satisfies ReservationHistoryListRow;

export const HISTORY_CANCELLED_LIST_ROW = {
  ...HISTORY_LIST_ROW,
  id: "7a1d2e44-9c3b-4f08-b6a2-1e5d8c0f3a67",
  status: RESERVATION_HISTORY_STATUS.CANCELLED,
} as const satisfies ReservationHistoryListRow;

export const HISTORY_UNEXPECTED_STATUS = "scheduled";

export const HISTORY_TOTAL_WITH_REMAINDER =
  PAGINATION.DEFAULT_PAGE_SIZE * 2 + 1;

export const HISTORY_TOTAL_EXACT =
  PAGINATION.DEFAULT_PAGE_SIZE * 3;

export const HISTORY_CLAMPED_PAGE_INDEX = 2;

export const HISTORY_CANCELLED_RECORD_ROW = {
  cancellation_reason: "El cliente no se presento",
  created_at: "2026-10-28T14:00:00+00:00",
  created_by_name: "Marta Rojas",
  customer_name: "Laura Campos",
  equipment_names: ["Kayak"],
  guide_names: [],
  id: "0f6b1c1e-62f1-4e71-8d4d-2f3c7a9e5b10",
  starts_at: "2026-10-30T15:00:00+00:00",
  status: RESERVATION_HISTORY_STATUS.CANCELLED,
  updated_at: "2026-10-30T18:30:00+00:00",
  updated_by_name: "Pedro Vargas",
} as const satisfies ReservationHistoryRecordRow;

export const HISTORY_CLOSED_RECORD_ROW = {
  ...HISTORY_CANCELLED_RECORD_ROW,
  cancellation_reason: null,
  status: RESERVATION_HISTORY_STATUS.CLOSED,
} as const satisfies ReservationHistoryRecordRow;
