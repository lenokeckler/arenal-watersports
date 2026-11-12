"use client";

import { useRef, useState } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDepartureMax } from "../models/ReservationSplitDepartureMax.interface";
import type { ReservationSplitDraftsApi } from "../models/ReservationSplitDraftsApi.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import { buildReservationSplitDraft } from "../utils/buildReservationSplitDraft";
import { buildReservationSplitInitialState } from "../utils/buildReservationSplitInitialState";
import { canAddReservationSplitDeparture } from "../utils/canAddReservationSplitDeparture";
import { clampReservationSplitValue } from "../utils/clampReservationSplitValue";
import { releaseReservationSplitUnits } from "../utils/releaseReservationSplitUnits";
import { resolveReservationSplitDepartureMax } from "../utils/resolveReservationSplitDepartureMax";
import { resolveReservationSplitRemainder } from "../utils/resolveReservationSplitRemainder";

export const useReservationSplitDrafts = (
  split: ReservationSplit
): ReservationSplitDraftsApi => {
  const nextKey = useRef(
    RESERVATION_SPLIT_DRAFT.FIRST_ADDED_KEY
  );
  const createKey = (): string => String(nextKey.current++);
  const [state, setState] = useState(() =>
    buildReservationSplitInitialState(
      split,
      RESERVATION_SPLIT_DRAFT.INITIAL_KEY
    )
  );
  const remainder = resolveReservationSplitRemainder(
    split,
    state
  );

  const updateDraft = (
    key: string,
    update: (
      draft: ReservationSplitDraft,
      max: ReservationSplitDepartureMax
    ) => ReservationSplitDraft
  ): void =>
    setState((current) => {
      const currentRemainder =
        resolveReservationSplitRemainder(split, current);
      return {
        ...current,
        drafts: current.drafts.map((draft) =>
          draft.key === key
            ? update(
                draft,
                resolveReservationSplitDepartureMax(
                  draft,
                  currentRemainder
                )
              )
            : draft
        ),
      };
    });

  const setTime = (key: string, time: string): void =>
    updateDraft(key, (draft) => ({ ...draft, time }));

  const stepPeopleCount = (
    key: string,
    delta: number
  ): void =>
    updateDraft(key, (draft, max) => ({
      ...draft,
      peopleCount: clampReservationSplitValue(
        draft.peopleCount + delta,
        RESERVATION_SPLIT_DRAFT.MIN_PEOPLE,
        max.peopleCount
      ),
    }));

  const stepQuantity = (
    key: string,
    itemId: string,
    delta: number
  ): void =>
    updateDraft(key, (draft, max) =>
      itemId in draft.quantities
        ? {
            ...draft,
            quantities: {
              ...draft.quantities,
              [itemId]: clampReservationSplitValue(
                draft.quantities[itemId] + delta,
                RESERVATION_SPLIT_DRAFT.NONE,
                max.quantities[itemId]
              ),
            },
          }
        : draft
    );

  const assignUnit = (
    unitId: string,
    departureKey: NullableRef<string>
  ): void =>
    setState((current) => {
      const isKnownTarget =
        departureKey === null ||
        current.drafts.some(
          (draft) => draft.key === departureKey
        );
      if (
        !isKnownTarget ||
        !(unitId in current.unitAssignments)
      ) {
        return current;
      }
      const next = {
        ...current,
        unitAssignments: {
          ...current.unitAssignments,
          [unitId]: departureKey,
        },
      };
      return resolveReservationSplitRemainder(split, next)
        .pieces < RESERVATION_SPLIT_DRAFT.MIN_PIECES
        ? current
        : next;
    });

  const addDeparture = (): void => {
    const key = createKey();
    setState((current) =>
      canAddReservationSplitDeparture(
        resolveReservationSplitRemainder(split, current),
        current
      )
        ? {
            ...current,
            drafts: [
              ...current.drafts,
              buildReservationSplitDraft(split, key),
            ],
          }
        : current
    );
  };

  const removeDeparture = (key: string): void =>
    setState((current) =>
      current.drafts.length >
      RESERVATION_SPLIT_DRAFT.MIN_DEPARTURES
        ? {
            drafts: current.drafts.filter(
              (draft) => draft.key !== key
            ),
            unitAssignments: releaseReservationSplitUnits(
              current.unitAssignments,
              key
            ),
          }
        : current
    );

  return {
    addDeparture,
    assignUnit,
    canAddDeparture: canAddReservationSplitDeparture(
      remainder,
      state
    ),
    remainder,
    removeDeparture,
    setTime,
    state,
    stepPeopleCount,
    stepQuantity,
  };
};
