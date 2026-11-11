import { STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";
import type { ReservationPostponementDraft } from "../models/ReservationPostponementDraft.interface";
import type { ReservationPostponementInput } from "../models/ReservationPostponementInput.interface";
import { parseReservationPostponementReading } from "./parseReservationPostponementReading";

export const buildReservationPostponementInput = (
  postponement: ReservationPostponement,
  draft: ReservationPostponementDraft,
  cause: ReservationPostponementCause
): ReservationPostponementInput => ({
  cause,
  date: draft.date,
  expectedUpdatedAt: postponement.expectedUpdatedAt,
  readings: postponement.readingUnits.map((unit) => {
    const reading = draft.readings[unit.itemId];

    return {
      fuelIn:
        unit.fuelMax === null
          ? null
          : parseReservationPostponementReading(
              reading?.fuelIn ?? STRING.Empty
            ),
      itemId: unit.itemId,
      usageIn:
        unit.usageMetric === null
          ? null
          : parseReservationPostponementReading(
              reading?.usageIn ?? STRING.Empty
            ),
    };
  }),
  reason:
    cause === RESERVATION_POSTPONEMENT_CAUSE.OTHER
      ? draft.reason.trim()
      : STRING.Empty,
  reservationId: postponement.id,
  time: draft.time,
});
