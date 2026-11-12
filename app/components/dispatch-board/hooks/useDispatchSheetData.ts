"use client";

import { useCallback, useEffect, useState } from "react";
import { loadDispatchSheet } from "../actions/loadDispatchSheet";
import { DISPATCH_SHEET_PHASE } from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import type { DispatchSheetPhase } from "../models/DispatchSheetPhase.type";

export const useDispatchSheetData = (
  reservationId: string
) => {
  const [groups, setGroups] = useState<
    DispatchSheetGroup[]
  >([]);
  const [phase, setPhase] = useState<DispatchSheetPhase>(
    DISPATCH_SHEET_PHASE.LOADING
  );

  const reload = useCallback(async (): Promise<
    DispatchSheetGroup[]
  > => {
    try {
      const nextGroups =
        await loadDispatchSheet(reservationId);
      setGroups(nextGroups);
      setPhase(DISPATCH_SHEET_PHASE.READY);

      return nextGroups;
    } catch {
      setPhase(DISPATCH_SHEET_PHASE.FAILED);

      return [];
    }
  }, [reservationId]);

  useEffect(() => {
    let isCurrent = true;

    loadDispatchSheet(reservationId)
      .then((nextGroups) => {
        if (isCurrent) {
          setGroups(nextGroups);
          setPhase(DISPATCH_SHEET_PHASE.READY);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setPhase(DISPATCH_SHEET_PHASE.FAILED);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [reservationId]);

  return { groups, phase, reload };
};
