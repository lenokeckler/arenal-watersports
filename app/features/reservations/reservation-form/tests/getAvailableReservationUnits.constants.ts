import type { ReservationUnitCommitment } from "../models/ReservationUnitCommitment.interface";

export const AVAILABLE_UNIT_TEST = {
  CATEGORY_ID: "category-concrete",
  CATEGORY_AVAILABILITY_RPC_PATH:
    "/rpc/category_availability",
  CATEGORY_COMMITTED_QUANTITY: 4,
  DATE: "2030-01-01",
  DURATION_MINUTES: 60,
  ENDS_AT: "2030-01-01T16:00:00.000Z",
  FREE_QUANTITY: 0,
  INTERCHANGEABLE_FREE_QUANTITY: 4,
  EXISTING_DISPATCH_CLOSED_AT: "2030-01-01T14:00:00.000Z",
  EXISTING_DISPATCHED_AT: "2029-12-31T15:00:00.000Z",
  EXISTING_RESERVATION_END: "2030-01-01T16:00:00.000Z",
  EXISTING_RESERVATION_ID: "existing-reservation",
  EXISTING_RESERVATION_START: "2030-01-01T15:00:00.000Z",
  NEXT_DATE: "2030-01-03",
  SECOND_UNIT_CODE: "PONTOON-2",
  SECOND_UNIT_ID: "unit-available-2",
  STARTS_AT: "2030-01-01T15:00:00.000Z",
  TIME: "09:00",
  UNIT_CODE: "PONTOON",
  UNIT_ID: "unit-available",
} as const;

export const TEST_SUPABASE_CLIENT = {
  ANON_KEY: "availability-test-anon-key",
  URL: "http://127.0.0.1:54321",
} as const;

export const RESERVATION_AVAILABILITY_INPUT_FIXTURE = {
  categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
  date: AVAILABLE_UNIT_TEST.DATE,
  durationMinutes: AVAILABLE_UNIT_TEST.DURATION_MINUTES,
  time: AVAILABLE_UNIT_TEST.TIME,
} as const;

export const OVERDUE_RESERVATION_UNIT_COMMITMENT_FIXTURE = {
  dispatch: {
    closed_at: null,
    dispatched_at:
      AVAILABLE_UNIT_TEST.EXISTING_DISPATCHED_AT,
  },
  reservation: {
    ends_at: AVAILABLE_UNIT_TEST.EXISTING_RESERVATION_END,
    starts_at:
      AVAILABLE_UNIT_TEST.EXISTING_RESERVATION_START,
  },
  unit_id: AVAILABLE_UNIT_TEST.UNIT_ID,
} satisfies ReservationUnitCommitment;

export const CLOSED_DISPATCH_RESERVATION_UNIT_COMMITMENT_FIXTURE =
  {
    dispatch: {
      closed_at:
        AVAILABLE_UNIT_TEST.EXISTING_DISPATCH_CLOSED_AT,
      dispatched_at:
        AVAILABLE_UNIT_TEST.EXISTING_DISPATCHED_AT,
    },
    reservation: {
      ends_at: AVAILABLE_UNIT_TEST.EXISTING_RESERVATION_END,
      starts_at:
        AVAILABLE_UNIT_TEST.EXISTING_RESERVATION_START,
    },
    unit_id: AVAILABLE_UNIT_TEST.UNIT_ID,
  } satisfies ReservationUnitCommitment;
