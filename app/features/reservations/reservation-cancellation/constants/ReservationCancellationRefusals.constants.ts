import type { ReservationCancellationRefusal } from "../models/ReservationCancellationRefusal.interface";
import { RESERVATION_CANCELLATION_ERROR } from "./ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "./ReservationCancellationFeedbackCopy.constants";

const { MESSAGE } = RESERVATION_CANCELLATION_ERROR;

export const RESERVATION_CANCELLATION_REFUSALS: readonly ReservationCancellationRefusal[] =
  [
    {
      formError: COPY.ACCESS_REQUIRED,
      message: MESSAGE.ACCESS_REQUIRED,
    },
    {
      formError: COPY.SUBMIT_ERROR,
      message: MESSAGE.PAYLOAD_NOT_OBJECT,
    },
    {
      formError: COPY.SUBMIT_ERROR,
      message: MESSAGE.PAYLOAD_INVALID,
    },
    {
      formError: COPY.NOT_FOUND,
      message: MESSAGE.NOT_FOUND,
    },
    {
      formError: COPY.NOT_CANCELLABLE,
      message: MESSAGE.NOT_CANCELLABLE,
    },
    { formError: COPY.STALE, message: MESSAGE.STALE },
    {
      errors: { reason: COPY.REASON_REQUIRED },
      message: MESSAGE.REASON_REQUIRED,
    },
    {
      errors: { reason: COPY.REASON_TOO_LONG },
      message: MESSAGE.REASON_TOO_LONG,
    },
  ];
