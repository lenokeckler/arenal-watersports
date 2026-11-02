import { RESERVATION_CALENDAR_ACTIVE_STATUS as status } from "@/app/constants";
import { RESERVATION_EDIT_QUERY } from "@/app/features/reservations/reservation-form/constants/ReservationEditQuery.constants";
import { E2E_RESERVATION_FORM_COPY } from "./E2eReservationForm.constants";
import { E2E_TIMEOUT_MS } from "./E2eRuntime.constants";

export const E2E_RESERVATION_EDIT = {
  NAME_OPERATION: "name the second edit worker",
  PEOPLE: "5",
  SCREENSHOT_BASENAME: "reservation-edit",
  SECOND_WORKER_NAME: "Segunda Persona E2E",
  SEED_OPERATION: "seed a reservation to edit",
  TEST_MODE: "default",
  TIME: "15:30",
} as const;

export const E2E_RESERVATION_EDIT_SAVE_WAIT = {
  timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
} as const;

export const E2E_RESERVATION_EDIT_SEED = {
  CANCELLED: { status: "cancelled" },
  COMBO: {
    categories: `${E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION},Paddleboard`,
    type: RESERVATION_EDIT_QUERY.COMBO_TYPE,
  },
  DISPATCHED: { status: status.DISPATCHED },
  SCHEDULED: {
    categories: E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION,
    status: status.SCHEDULED,
    type: "rental",
  },
} as const;

export const E2E_RESERVATION_EDIT_SQL = {
  NAME_WORKER:
    "update workers set full_name = :'full_name' where id = :'uid';",
  SEED: `
with reservation as (
  insert into reservations (cancellation_reason, created_by, customer_name, duration_minutes, people_count, starts_at, status, type, updated_by)
  values (
    case :'status' when 'cancelled' then :'customer' end, :'uid', :'customer', 60, 2,
    (date_trunc('day', now() at time zone 'America/Costa_Rica') + interval '10 hours') at time zone 'America/Costa_Rica',
    :'status', :'type', :'uid'
  ) returning id
), items as (
  insert into reservation_items (category_id, created_by, quantity, reservation_id, updated_by)
  select category.id, :'uid', 1, reservation.id, :'uid' from reservation, equipment_categories category
  where category.name = any (string_to_array(:'categories', ','))
)
select id from reservation;`,
} as const;

export const E2E_RESERVATION_EDIT_SCREENSHOT_STATE = {
  CALENDAR_LINK: "calendar-link",
  FORM: "form",
  LOCKED_COMBO: "locked-combo",
  NON_EDITABLE: "non-editable",
  SUCCESS: "success",
} as const;
