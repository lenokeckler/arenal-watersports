import {
  RESERVATION_DETAIL_MONEY_FIXTURE,
  RESERVATION_DETAIL_PRICING_FIXTURE,
  RESERVATION_DETAIL_TEST,
} from "./ReservationDetailTest.constants";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const RESERVATION_DETAIL_SOURCE_FIXTURE = {
  cancellation_reason: null,
  closed_at: null,
  code: RESERVATION_DETAIL_TEST.RESERVATION_CODE,
  combo: null,
  created_at: RESERVATION_DETAIL_TEST.TIMESTAMP,
  created_by: RESERVATION_DETAIL_TEST.CREATED_WORKER_ID,
  customer_name: RESERVATION_DETAIL_TEST.CUSTOMER_NAME,
  dispatched_at: null,
  duration_minutes:
    RESERVATION_DETAIL_TEST.DURATION_MINUTES,
  ends_at: RESERVATION_DETAIL_TEST.EXPECTED_RETURN,
  id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
  parent_reservation_id: null,
  people_count: RESERVATION_DETAIL_TEST.PEOPLE_COUNT,
  refunds: RESERVATION_DETAIL_MONEY_FIXTURE.refunds,
  reservation_charges:
    RESERVATION_DETAIL_MONEY_FIXTURE.charges,
  reservation_dispatches: [
    {
      category: {
        name: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
      },
      category_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      closed_at: RESERVATION_DETAIL_TEST.ACTUAL_ARRIVAL,
      dispatched_at:
        RESERVATION_DETAIL_TEST.ACTUAL_DEPARTURE,
      ends_at: RESERVATION_DETAIL_TEST.EXPECTED_RETURN,
      id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
    },
  ],
  reservation_guides: [
    {
      worker_id: RESERVATION_DETAIL_TEST.GUIDE_WORKER_ID,
    },
  ],
  reservation_items: [
    {
      category: null,
      category_id: null,
      dispatch_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      extra: null,
      extra_id: null,
      quantity: null,
      unit: {
        category: {
          name: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
        },
        code: RESERVATION_DETAIL_TEST.UNIT_CODE,
      },
      unit_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
    },
    {
      category: {
        name: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
      },
      category_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      dispatch_id: null,
      extra: null,
      extra_id: null,
      quantity: RESERVATION_DETAIL_TEST.QUANTITY,
      unit: null,
      unit_id: null,
    },
    {
      category: {
        name: RESERVATION_DETAIL_TEST.CATEGORY_NAME,
      },
      category_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      dispatch_id: null,
      extra: { name: RESERVATION_DETAIL_TEST.EXTRA_NAME },
      extra_id: RESERVATION_DETAIL_TEST.RESERVATION_ID,
      quantity: RESERVATION_DETAIL_TEST.QUANTITY,
      unit: null,
      unit_id: null,
    },
  ],
  reservation_pricing: RESERVATION_DETAIL_PRICING_FIXTURE,
  starts_at: RESERVATION_DETAIL_TEST.RESERVATION_START,
  status: RESERVATION_DETAIL_TEST.RESERVATION_STATUS,
  type: RESERVATION_DETAIL_TEST.RESERVATION_TYPE,
  updated_at: RESERVATION_DETAIL_TEST.TIMESTAMP,
  updated_by: RESERVATION_DETAIL_TEST.UPDATED_WORKER_ID,
} satisfies ReservationDetailReservationSource;
