import { RESERVATION_DETAIL_CHARGE_STATUS } from "../constants/ReservationDetail.constants";
import type { ReservationDetail } from "../models/ReservationDetail.interface";
import { RESERVATION_DETAIL_OVERVIEW_TEST as test } from "./ReservationDetailOverviewTest.constants";

export const RESERVATION_DETAIL_OVERVIEW_FIXTURE: ReservationDetail =
  {
    cancellation_reason: null,
    chargeStatus: RESERVATION_DETAIL_CHARGE_STATUS.PENDING,
    charges: [],
    closed_at: null,
    code: test.RESERVATION_CODE,
    comboName: null,
    created_at: test.TIMESTAMP,
    createdByName: null,
    customer_name: test.CUSTOMER_NAME,
    dispatched_at: null,
    dispatches: [],
    duration_minutes: test.DURATION_MINUTES,
    ends_at: test.RESERVATION_END,
    equipment: [],
    extraTimeCharges: [],
    extras: [],
    guides: [],
    id: test.RESERVATION_ID,
    parent_reservation_id: null,
    people_count: test.PEOPLE_COUNT,
    refunds: [],
    starts_at: test.RESERVATION_START,
    status: test.RESERVATION_STATUS,
    type: test.RESERVATION_TYPE,
    updated_at: test.TIMESTAMP,
    updatedByName: null,
  };
