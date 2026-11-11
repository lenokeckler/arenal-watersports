"use client";

import { useState } from "react";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementDraft } from "../models/ReservationPostponementDraft.interface";
import type { ReservationPostponementDraftApi } from "../models/ReservationPostponementDraftApi.interface";
import { buildReservationPostponementDraft } from "../utils/buildReservationPostponementDraft";

export const useReservationPostponementDraft = (
  postponement: ReservationPostponement
): ReservationPostponementDraftApi => {
  const [draft, setDraft] = useState(() =>
    buildReservationPostponementDraft(postponement)
  );

  const setField =
    <Field extends "cause" | "date" | "reason" | "time">(
      field: Field
    ) =>
    (
      value: NonNullable<
        ReservationPostponementDraft[Field]
      >
    ) =>
      setDraft((current) => ({
        ...current,
        [field]: value,
      }));

  const setReading: ReservationPostponementDraftApi["setReading"] =
    (itemId, field, value) =>
      setDraft((current) => ({
        ...current,
        readings: {
          ...current.readings,
          [itemId]: {
            ...current.readings[itemId],
            [field]: value,
          },
        },
      }));

  return {
    draft,
    setCause: setField("cause"),
    setDate: setField("date"),
    setReading,
    setReason: setField("reason"),
    setTime: setField("time"),
  };
};
