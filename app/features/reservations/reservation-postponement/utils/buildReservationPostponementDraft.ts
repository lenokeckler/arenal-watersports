import { STRING } from "@/app/constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementDraft } from "../models/ReservationPostponementDraft.interface";

export const buildReservationPostponementDraft = ({
  date,
  readingUnits,
  time,
}: ReservationPostponement): ReservationPostponementDraft => ({
  cause: null,
  date,
  readings: Object.fromEntries(
    readingUnits.map(({ itemId }) => [
      itemId,
      { fuelIn: STRING.Empty, usageIn: STRING.Empty },
    ])
  ),
  reason: STRING.Empty,
  time,
});
