import {
  renderHook,
  type RenderHookResult,
} from "@testing-library/react";
import { useReservationRefundSubmission } from "../hooks/useReservationRefundSubmission";
import type { ReservationRefundSubmission } from "../models/ReservationRefundSubmission.interface";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";
import { REFUND_RESERVATION_ID } from "./ReservationRefund.constants";
import {
  AVAILABLE_USD,
  VALID_REFUND_VALUES,
} from "./ReservationRefundValues.constants";

export const renderSubmission = (
  values: ReservationRefundValues = VALID_REFUND_VALUES,
  available: number = AVAILABLE_USD
): RenderHookResult<ReservationRefundSubmission, unknown> =>
  renderHook(() =>
    useReservationRefundSubmission(
      REFUND_RESERVATION_ID,
      values,
      available
    )
  );
