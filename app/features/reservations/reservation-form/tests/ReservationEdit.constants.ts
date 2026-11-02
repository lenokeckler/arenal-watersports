import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import type { ReservationEditInput } from "../models/ReservationEditInput.interface";
import type { ReservationEditRow } from "../models/ReservationEditRow.type";
import type { ReservationEditRowItem } from "../models/ReservationEditRowItem.type";
import { VALID_RESERVATION_FORM_INPUT } from "./reservationFormUtils.constants";

export const RESERVATION_EDIT_TEST = {
  CATEGORY_ID: "e3180000-0000-4000-8000-000000000101",
  CATEGORY_NAME: "Kayak",
  EXPECTED_DATE: "2035-04-12",
  EXPECTED_TIME: "09:00",
  EXTRA_ID: "e3180000-0000-4000-8000-000000000501",
  FIRST_ITEM_ID: "e3180000-0000-4000-8000-000000000601",
  MALFORMED_ID: "not-a-reservation",
  MICROSECOND_INSTANT: "2035-04-12T15:00:00.123456+00:00",
  QUANTITY: 2,
  RENTAL_TYPE: "rental",
  RESERVATION_ID: "e3180000-0000-4000-8000-000000000301",
  SECOND_ITEM_ID: "e3180000-0000-4000-8000-000000000602",
  UNIT_CODE: "PONTOON-1",
  UNIT_ID: "e3180000-0000-4000-8000-000000000201",
  UNKNOWN_ERROR: "Unexpected database failure",
} as const;

export const COSTA_RICA_TIME_CASES = [
  ["2035-04-13T05:30:00.000Z", "23:30"],
  ["2035-04-13T06:00:00.000Z", "00:00"],
] as const;

const EMPTY_ITEM = {
  category: null,
  category_id: null,
  dispatch_id: null,
  extra_id: null,
  quantity: null,
  unit: null,
  unit_id: null,
} as const;

const KAYAK = {
  id: RESERVATION_EDIT_TEST.CATEGORY_ID,
  name: RESERVATION_EDIT_TEST.CATEGORY_NAME,
} as const;

export const RESERVATION_EDIT_CATEGORY_ITEM: ReservationEditRowItem =
  {
    ...EMPTY_ITEM,
    category: KAYAK,
    category_id: KAYAK.id,
    id: RESERVATION_EDIT_TEST.SECOND_ITEM_ID,
    quantity: RESERVATION_EDIT_TEST.QUANTITY,
  };

export const RESERVATION_EDIT_UNIT_ITEM: ReservationEditRowItem =
  {
    ...EMPTY_ITEM,
    id: RESERVATION_EDIT_TEST.FIRST_ITEM_ID,
    unit: {
      category: KAYAK,
      code: RESERVATION_EDIT_TEST.UNIT_CODE,
    },
    unit_id: RESERVATION_EDIT_TEST.UNIT_ID,
  };

export const RESERVATION_EDIT_EXTRA_ITEM: ReservationEditRowItem =
  {
    ...EMPTY_ITEM,
    extra_id: RESERVATION_EDIT_TEST.EXTRA_ID,
    id: RESERVATION_EDIT_TEST.SECOND_ITEM_ID,
  };

export const RESERVATION_EDIT_ROW: ReservationEditRow = {
  customer_name: "Familia Vargas",
  duration_minutes: 90,
  id: RESERVATION_EDIT_TEST.RESERVATION_ID,
  people_count: 3,
  reservation_items: [RESERVATION_EDIT_CATEGORY_ITEM],
  starts_at: "2035-04-12T15:00:00+00:00",
  status: RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED,
  type: RESERVATION_EDIT_TEST.RENTAL_TYPE,
  updated_at: RESERVATION_EDIT_TEST.MICROSECOND_INSTANT,
};

export const VALID_RESERVATION_EDIT_INPUT: ReservationEditInput =
  {
    ...VALID_RESERVATION_FORM_INPUT,
    expectedUpdatedAt:
      RESERVATION_EDIT_TEST.MICROSECOND_INSTANT,
    reservationId: RESERVATION_EDIT_TEST.RESERVATION_ID,
  };
