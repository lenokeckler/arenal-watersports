import type { ReservationSplitUnitAssignments } from "../models/ReservationSplitUnitAssignments.type";

export const releaseReservationSplitUnits = (
  assignments: ReservationSplitUnitAssignments,
  departureKey: string
): ReservationSplitUnitAssignments =>
  Object.fromEntries(
    Object.entries(assignments).map(
      ([unitId, assignedKey]) => [
        unitId,
        assignedKey === departureKey ? null : assignedKey,
      ]
    )
  );
