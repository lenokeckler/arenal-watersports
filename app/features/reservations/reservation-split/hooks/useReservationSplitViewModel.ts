"use client";

import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitViewModel } from "../models/ReservationSplitViewModel.interface";
import { buildReservationSplitInput } from "../utils/buildReservationSplitInput";
import { validateReservationSplitDrafts } from "../utils/validateReservationSplitDrafts";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { useReservationSplitDepartureFocus } from "./useReservationSplitDepartureFocus";
import { useReservationSplitErrorFocus } from "./useReservationSplitErrorFocus";
import { useReservationSplitDrafts } from "./useReservationSplitDrafts";
import { useReservationSplitSubmission } from "./useReservationSplitSubmission";

export const useReservationSplitViewModel = (
  split: ReservationSplit
): ReservationSplitViewModel => {
  const drafts = useReservationSplitDrafts(split);
  const submission = useReservationSplitSubmission();
  const focus = useReservationSplitDepartureFocus(
    drafts.state.drafts
  );
  useReservationSplitErrorFocus(
    submission.errors,
    submission.formError,
    drafts.state.drafts
  );
  const isSubmitDisabled =
    submission.isPending ||
    submission.isStale ||
    submission.createdDepartures.length > 0;

  const indexOfDeparture = (key: string): number =>
    drafts.state.drafts.findIndex(
      (draft) => draft.key === key
    );

  const whenIdle =
    <Args extends unknown[]>(
      action: (...args: Args) => void
    ) =>
    (...args: Args): void => {
      if (!submission.isPending) {
        action(...args);
      }
    };

  const withClearedErrors = <Args extends unknown[]>(
    action: (...args: Args) => void
  ) =>
    whenIdle((...args: Args): void => {
      action(...args);
      submission.clearErrors();
    });

  const addDeparture = withClearedErrors(() => {
    drafts.addDeparture();
    focus.moveFocus({
      index: drafts.state.drafts.length,
      message: RESERVATION_SPLIT_UI_COPY.ANNOUNCE_ADDED(
        drafts.state.drafts.length +
          RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
      ),
    });
  });

  const removeDeparture = withClearedErrors(
    (key: string) => {
      const index = indexOfDeparture(key);
      drafts.removeDeparture(key);
      focus.moveFocus({
        index: Math.max(
          index - RESERVATION_SPLIT_DRAFT.MIN_DEPARTURES,
          RESERVATION_SPLIT_DRAFT.NONE
        ),
        message: RESERVATION_SPLIT_UI_COPY.ANNOUNCE_REMOVED(
          index +
            RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
        ),
      });
    }
  );

  const setTime: ReservationSplitViewModel["setTime"] =
    whenIdle((key, time) => {
      drafts.setTime(key, time);
      submission.clearDepartureError(
        indexOfDeparture(key),
        "time"
      );
    });

  const stepPeopleCount: ReservationSplitViewModel["stepPeopleCount"] =
    whenIdle((key, delta) => {
      drafts.stepPeopleCount(key, delta);
      submission.clearDepartureError(
        indexOfDeparture(key),
        "peopleCount"
      );
    });

  const stepQuantity: ReservationSplitViewModel["stepQuantity"] =
    whenIdle((key, itemId, delta) => {
      drafts.stepQuantity(key, itemId, delta);
      submission.clearDepartureError(
        indexOfDeparture(key),
        "items"
      );
    });

  const handleSubmit: ReservationSplitViewModel["handleSubmit"] =
    (event) => {
      event?.preventDefault();
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
    addDeparture,
    announcement: focus.announcement,
    assignUnit: withClearedErrors(drafts.assignUnit),
    createdDepartures: submission.createdDepartures,
    errors: submission.errors,
    formError: submission.formError,
    handleSubmit,
    isPending: submission.isPending,
    isStale: submission.isStale,
    isSubmitDisabled,
    removeDeparture,
    setTime,
    stepPeopleCount,
    stepQuantity,
  };
};
