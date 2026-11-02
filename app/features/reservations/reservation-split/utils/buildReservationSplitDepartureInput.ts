import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_LIMITS } from "../constants/ReservationSplitLimits.constants";
import type { ReservationSplitDepartureInput } from "../models/ReservationSplitDepartureInput.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitUnitAssignments } from "../models/ReservationSplitUnitAssignments.type";

export const buildReservationSplitDepartureInput = (
  draft: ReservationSplitDraft,
  unitAssignments: ReservationSplitUnitAssignments
): ReservationSplitDepartureInput => ({
  items: [
    ...Object.entries(draft.quantities)
      .filter(
        ([, quantity]) =>
          quantity > RESERVATION_SPLIT_DRAFT.NONE
      )
      .map(([itemId, quantity]) => ({ itemId, quantity })),
    ...Object.entries(unitAssignments)
      .filter(
        ([, departureKey]) => departureKey === draft.key
      )
      .map(([unitId]) => ({
        itemId: unitId,
        quantity: RESERVATION_SPLIT_LIMITS.UNIT_PIECES,
      })),
  ],
  peopleCount: draft.peopleCount,
  time: draft.time,
});
