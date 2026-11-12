import {
  renderHook,
  type RenderHookResult,
} from "@testing-library/react";
import { useReservationChargeSubmission } from "../hooks/useReservationChargeSubmission";
import type { ReservationChargeSubmission } from "../models/ReservationChargeSubmission.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";
import { VALID_CHARGE_VALUES } from "./ReservationChargeValues.constants";

export const renderSubmission = (
  values: ReservationChargeValues = VALID_CHARGE_VALUES
): RenderHookResult<ReservationChargeSubmission, unknown> =>
  renderHook(() =>
    useReservationChargeSubmission(
      CHARGE_RESERVATION_ID,
      values
    )
  );
