"use client";

import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitViewModel } from "../models/ReservationSplitViewModel.interface";
import { buildReservationSplitInput } from "../utils/buildReservationSplitInput";
import { validateReservationSplitDrafts } from "../utils/validateReservationSplitDrafts";
import { useReservationSplitDrafts } from "./useReservationSplitDrafts";
import { useReservationSplitSubmission } from "./useReservationSplitSubmission";

export const useReservationSplitViewModel = (
  split: ReservationSplit
): ReservationSplitViewModel => {
  const drafts = useReservationSplitDrafts(split);
  const submission = useReservationSplitSubmission();
  const isSubmitDisabled =
    submission.isPending ||
    submission.isStale ||
    submission.createdDepartures.length > 0;

  const indexOfDeparture = (key: string): number =>
    drafts.state.drafts.findIndex(
      (draft) => draft.key === key
    );

  const withClearedErrors =
    <Args extends unknown[]>(
      action: (...args: Args) => void
    ) =>
    (...args: Args): void => {
      action(...args);
      submission.clearErrors();
    };

  const setTime: ReservationSplitViewModel["setTime"] = (
    key,
    time
  ) => {
    drafts.setTime(key, time);
    submission.clearDepartureError(
      indexOfDeparture(key),
      "time"
    );
  };

  const stepPeopleCount: ReservationSplitViewModel["stepPeopleCount"] =
    (key, delta) => {
      drafts.stepPeopleCount(key, delta);
      submission.clearDepartureError(
        indexOfDeparture(key),
        "peopleCount"
      );
    };

  const stepQuantity: ReservationSplitViewModel["stepQuantity"] =
    (key, itemId, delta) => {
      drafts.stepQuantity(key, itemId, delta);
      submission.clearDepartureError(
        indexOfDeparture(key),
        "items"
      );
    };

  const handleSubmit: ReservationSplitViewModel["handleSubmit"] =
    (event) => {
      event.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      const errors = validateReservationSplitDrafts(
        split,
        drafts.state
      );
      if (errors) {
        submission.reportErrors(errors);
        return;
      }
      void submission.submit(
        buildReservationSplitInput(split, drafts.state)
      );
    };

  return {
    ...drafts,
    addDeparture: withClearedErrors(drafts.addDeparture),
    assignUnit: withClearedErrors(drafts.assignUnit),
    createdDepartures: submission.createdDepartures,
    errors: submission.errors,
    formError: submission.formError,
    handleSubmit,
    isPending: submission.isPending,
    isStale: submission.isStale,
    isSubmitDisabled,
    removeDeparture: withClearedErrors(
      drafts.removeDeparture
    ),
    setTime,
    stepPeopleCount,
    stepQuantity,
  };
};
