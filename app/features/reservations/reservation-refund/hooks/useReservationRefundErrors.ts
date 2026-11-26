"use client";

import { useState } from "react";
import {
  RESERVATION_REFUND_NO_ERRORS,
  RESERVATION_REFUND_NO_FORM_ERROR,
} from "../constants/ReservationRefundDefaults.constants";
import type { ReservationRefundErrorsState } from "../models/ReservationRefundErrorsState.interface";

export const useReservationRefundErrors =
  (): ReservationRefundErrorsState => {
    const [errors, setErrors] = useState(
      RESERVATION_REFUND_NO_ERRORS
    );
    const [formError, setFormError] = useState(
      RESERVATION_REFUND_NO_FORM_ERROR
    );

    const showErrors: ReservationRefundErrorsState["showErrors"] =
      (nextErrors, nextFormError) => {
        setErrors(nextErrors);
        setFormError(
          nextFormError ?? RESERVATION_REFUND_NO_FORM_ERROR
        );
      };

    const clearErrors = (): void =>
      showErrors(
        RESERVATION_REFUND_NO_ERRORS,
        RESERVATION_REFUND_NO_FORM_ERROR
      );

    return { clearErrors, errors, formError, showErrors };
  };
