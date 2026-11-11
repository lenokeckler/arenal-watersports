import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementDraft } from "../models/ReservationPostponementDraft.interface";
import type { ReservationPostponementReadingDraft } from "../models/ReservationPostponementReadingDraft.interface";
import { mapReservationPostponement } from "../utils/mapReservationPostponement";
import {
  DISPATCHED_ROW,
  EXPECTED_SCHEDULED,
  FUEL_UNIT_ITEM_ROW,
  KILOMETERS_UNIT_ITEM_ROW,
} from "./ReservationPostponement.constants";

export const DISPATCHED_POSTPONEMENT: ReservationPostponement =
  mapReservationPostponement(DISPATCHED_ROW);

export const SCHEDULED_POSTPONEMENT = EXPECTED_SCHEDULED;

export const FUEL_ITEM_ID = FUEL_UNIT_ITEM_ROW.id;
export const KILOMETERS_ITEM_ID =
  KILOMETERS_UNIT_ITEM_ROW.id;

export const NEW_DATE = "2035-04-14";
export const NEW_TIME = "09:30";
export const NEW_DATE_TEXT = "14 de abril";
export const OTHER_REASON = "Cliente enfermo";

export const COMPLETE_SCHEDULED_DRAFT: ReservationPostponementDraft =
  {
    cause: RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
    date: NEW_DATE,
    readings: {},
    reason: "",
    time: NEW_TIME,
  };

export const buildDispatchedDraft = (
  fuel: ReservationPostponementReadingDraft,
  kilometers: ReservationPostponementReadingDraft
): ReservationPostponementDraft => ({
  ...COMPLETE_SCHEDULED_DRAFT,
  readings: {
    [FUEL_ITEM_ID]: fuel,
    [KILOMETERS_ITEM_ID]: kilometers,
  },
});

export const COMPLETE_DISPATCHED_DRAFT =
  buildDispatchedDraft(
    { fuelIn: "3", usageIn: "1250,5" },
    { fuelIn: "", usageIn: "8120" }
  );

export const EMPTY_READING: ReservationPostponementReadingDraft =
  { fuelIn: "", usageIn: "" };
