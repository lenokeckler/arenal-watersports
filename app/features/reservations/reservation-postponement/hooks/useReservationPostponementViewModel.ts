"use client";

import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementViewModel } from "../models/ReservationPostponementViewModel.interface";
import { buildReservationPostponementInput } from "../utils/buildReservationPostponementInput";
import { listReservationPostponementCauses } from "../utils/listReservationPostponementCauses";
import { validateReservationPostponementDraft } from "../utils/validateReservationPostponementDraft";
import { useReservationPostponementDraft } from "./useReservationPostponementDraft";
import { useReservationPostponementSubmission } from "./useReservationPostponementSubmission";

export const useReservationPostponementViewModel = (
  postponement: ReservationPostponement
): ReservationPostponementViewModel => {
  const draftApi =
    useReservationPostponementDraft(postponement);
  const submission = useReservationPostponementSubmission();
  const isSubmitDisabled =
    submission.isPending ||
    submission.isStale ||
    submission.isSubmitted;

  const whenIdle =
    <Args extends unknown[]>(
      action: (...args: Args) => void
    ) =>
    (...args: Args): void => {
      if (!submission.isPending) {
        action(...args);
      }
    };

  const handleSubmit: ReservationPostponementViewModel["handleSubmit"] =
    (event) => {
      event?.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      const { draft } = draftApi;
      const errors = validateReservationPostponementDraft(
        postponement,
        draft
      );
      if (errors || draft.cause === null) {
        submission.reportErrors(errors ?? { readings: {} });
        return;
      }
      void submission.submit(
        buildReservationPostponementInput(
          postponement,
          draft,
          draft.cause
        )
      );
    };

  return {
    causes: listReservationPostponementCauses(
      postponement.isDispatched
    ),
    draft: draftApi.draft,
    errors: submission.errors,
    formError: submission.formError,
    handleSubmit,
    isPending: submission.isPending,
    isStale: submission.isStale,
    isSubmitDisabled,
    isSubmitted: submission.isSubmitted,
    setCause: whenIdle((cause) => {
      draftApi.setCause(cause);
      submission.clearFieldError("cause");
    }),
    setDate: whenIdle((date) => {
      draftApi.setDate(date);
      submission.clearFieldError("date");
    }),
    setReading: whenIdle((itemId, field, value) => {
      draftApi.setReading(itemId, field, value);
      submission.clearReadingError(itemId, field);
    }),
    setReason: whenIdle((reason) => {
      draftApi.setReason(reason);
      submission.clearFieldError("reason");
    }),
    setTime: whenIdle((time) => {
      draftApi.setTime(time);
      submission.clearFieldError("time");
    }),
  };
};
