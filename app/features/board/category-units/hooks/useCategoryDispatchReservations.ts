"use client";

import { useEffect, useState } from "react";
import { loadCategoryDispatchReservations } from "@/app/components/dispatch-board/actions/loadCategoryDispatchReservations";
import { DISPATCH_SHEET_PHASE } from "@/app/components/dispatch-board/constants/DispatchSheetCopy.constants";
import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";
import type { DispatchSheetPhase } from "@/app/components/dispatch-board/models/DispatchSheetPhase.type";

export const useCategoryDispatchReservations = (
  categoryId: string
) => {
  const [reservations, setReservations] = useState<
    CategoryDispatchReservation[]
  >([]);
  const [phase, setPhase] = useState<DispatchSheetPhase>(
    DISPATCH_SHEET_PHASE.LOADING
  );

  useEffect(() => {
    let isCurrent = true;

    loadCategoryDispatchReservations(categoryId)
      .then((nextReservations) => {
        if (isCurrent) {
          setReservations(nextReservations);
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
  }, [categoryId]);

  return { phase, reservations };
};
