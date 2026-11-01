import { RESERVATION_TYPE } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "@/app/features/board/reservation-history/constants/ReservationHistoryCopy.constants";
import { E2E_SUPABASE_TABLE } from "./E2eSupabase.constants";

export const E2E_RESERVATION_HISTORY_COPY =
  RESERVATION_HISTORY_COPY;

export const E2E_RESERVATION_HISTORY_STATUS = {
  CANCELLED: "cancelled",
  CLOSED: "closed",
  SCHEDULED: "scheduled",
} as const;

export const E2E_RESERVATION_HISTORY = {
  CANCELLATION_REASON: "TAB-09 E2E weather",
  CUSTOMER_PREFIX: "TAB-09 E2E",
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 1,
  QUANTITY: 2,
  STARTS_AT: "2031-01-01T15:00:00.000Z",
  TYPE: RESERVATION_TYPE.RENTAL,
} as const;

export const E2E_RESERVATION_HISTORY_CATALOGUE = {
  EXTRA_NAME: "Parrilla",
  QUANTITY_CATEGORY_NAME: "Chaleco",
  UNIT_CODE: "JET-01",
} as const;

export const E2E_RESERVATION_HISTORY_COLUMN = {
  ASSIGNED_BY: "assigned_by",
  CANCELLATION_REASON: "cancellation_reason",
  CATEGORY_ID: "category_id",
  CODE: "code",
  CREATED_BY: "created_by",
  CUSTOMER_NAME: "customer_name",
  DURATION_MINUTES: "duration_minutes",
  EXTRA_ID: "extra_id",
  ID: "id",
  NAME: "name",
  PEOPLE_COUNT: "people_count",
  QUANTITY: "quantity",
  RESERVATION_ID: "reservation_id",
  STARTS_AT: "starts_at",
  STATUS: "status",
  TYPE: "type",
  UNIT_ID: "unit_id",
  UPDATED_BY: "updated_by",
  WORKER_ID: "worker_id",
} as const;

export const E2E_RESERVATION_HISTORY_ERROR = {
  CREATE_OPERATION: "create a reservation history record",
  READ_CATALOGUE_OPERATION: "read a seeded catalogue row",
  REMOVE_OPERATION: "remove a reservation history record",
} as const;

export const E2E_RESERVATION_HISTORY_CHILD_TABLES = [
  E2E_SUPABASE_TABLE.RESERVATION_ITEMS,
  E2E_SUPABASE_TABLE.RESERVATION_GUIDES,
] as const;
