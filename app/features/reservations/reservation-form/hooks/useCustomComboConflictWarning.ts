import { useCallback, useMemo, useState } from "react";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { ReservationCategoryConflictWarningViewModel } from "../models/ReservationCategoryConflictWarningViewModel.interface";
import { buildCustomComboConflictRequest } from "../utils/buildCustomComboConflictRequest";
import { mapReservationCategoryConflictsToWarningItems } from "../utils/mapReservationCategoryConflictsToWarningItems";
import { useCustomComboConflictLookup } from "./useCustomComboConflictLookup";

export const useCustomComboConflictWarning = (
  selections: CustomComboEquipmentSelection[],
  date: string,
  durationHours: number,
  time: string
): ReservationCategoryConflictWarningViewModel => {
  const [retryRevision, setRetryRevision] = useState(0);
  const request = useMemo(
    () =>
      buildCustomComboConflictRequest(
        selections,
        date,
        durationHours,
        time,
        retryRevision
      ),
    [date, durationHours, retryRevision, selections, time]
  );
  const lookup = useCustomComboConflictLookup({ request });
  const hasCurrentLookup = lookup.key === request.key;
  const retry = useCallback(
    () => setRetryRevision((revision) => revision + 1),
    []
  );

  return {
    hasError: hasCurrentLookup && lookup.hasError,
    isLoading:
      request.isValid &&
      (!hasCurrentLookup || lookup.isLoading),
    items: mapReservationCategoryConflictsToWarningItems(
      hasCurrentLookup ? lookup.conflicts : []
    ),
    retry,
  };
};
