import { useEffect } from "react";
import type { NullableRef } from "@/app/types";
import {
  RESERVATION_FORM_ERROR_TARGET_ID,
  RESERVATION_FORM_FIELD_ID,
} from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_ERROR_FOCUS_ORDER } from "../models/ReservationFormField.constants";
import type { useReservationSubmissionState } from "./useReservationSubmissionState";

type ReservationSubmissionState = ReturnType<
  typeof useReservationSubmissionState
>;

const resolveErrorTargetId = (
  submission: ReservationSubmissionState
): NullableRef<string> => {
  if (submission.formError) {
    return RESERVATION_FORM_FIELD_ID.SUBMISSION_ERROR;
  }

  const firstFieldWithError =
    RESERVATION_FORM_ERROR_FOCUS_ORDER.find((field) =>
      Boolean(submission.errors[field])
    );

  return firstFieldWithError
    ? RESERVATION_FORM_ERROR_TARGET_ID[firstFieldWithError]
    : null;
};

export const useReservationFormErrorFocus = (
  submission: ReservationSubmissionState
): void => {
  const errorTargetId = resolveErrorTargetId(submission);

  useEffect(() => {
    if (errorTargetId) {
      document.getElementById(errorTargetId)?.focus();
    }
  }, [errorTargetId, submission.errorFocusRequest]);
};
