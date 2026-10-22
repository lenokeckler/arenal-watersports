import type { TransitionStartFunction } from "react";
import { createReservationAction } from "../actions/createReservationAction";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import type { CustomComboReservationActionResult } from "../models/CustomComboReservationActionResult.type";
import type { PredefinedComboReservationInput } from "../models/PredefinedComboReservationInput.interface";
import type { PredefinedComboReservationActionResult } from "../models/PredefinedComboReservationActionResult.type";
import type { ReservationFormSubmissionHandlers } from "../models/ReservationFormSubmissionHandlers.interface";
import { mapCustomComboReservationResult } from "./mapCustomComboReservationResult";
import { mapPredefinedComboReservationResult } from "./mapPredefinedComboReservationResult";

const createSubmissionCallback =
  <TInput, TResult>(
    action: (input: TInput) => Promise<TResult>,
    mapResult: (
      result: TResult
    ) => ReservationFormActionResult,
    submission: ReservationFormSubmissionHandlers,
    startTransition: TransitionStartFunction
  ): ((input: TInput) => void) =>
  (input) =>
    startTransition(async () => {
      try {
        submission.applyResult(
          mapResult(await action(input))
        );
      } catch {
        submission.setSubmissionError(
          RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
        );
      }
    });

export const createReservationFormSubmissionCallbacks = (
  submission: ReservationFormSubmissionHandlers,
  startTransition: TransitionStartFunction
) => ({
  submitReservation: createSubmissionCallback<
    ReservationFormInput,
    ReservationFormActionResult
  >(
    createReservationAction,
    (result) => result,
    submission,
    startTransition
  ),
  submitCustomComboReservation: createSubmissionCallback<
    CustomComboReservationInput,
    CustomComboReservationActionResult
  >(
    createCustomComboReservationAction,
    mapCustomComboReservationResult,
    submission,
    startTransition
  ),
  submitPredefinedComboReservation:
    createSubmissionCallback<
      PredefinedComboReservationInput,
      PredefinedComboReservationActionResult
    >(
      createPredefinedComboReservationAction,
      mapPredefinedComboReservationResult,
      submission,
      startTransition
    ),
});
