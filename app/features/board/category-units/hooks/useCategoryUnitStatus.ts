"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { submitBoardUnitMaintenance } from "../actions/submitBoardUnitMaintenance";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitStatusSheetProps } from "../models/CategoryUnitStatusSheetProps.interface";
import type { CategoryUnitStatusViewModel } from "../models/CategoryUnitStatusViewModel.interface";

export const useCategoryUnitStatus = ({
  onClose,
  unit,
}: CategoryUnitStatusSheetProps): CategoryUnitStatusViewModel => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const change = async (
    inMaintenance: boolean
  ): Promise<void> => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const { status } = await submitBoardUnitMaintenance({
        inMaintenance,
        unitId: unit.id,
      });

      if (
        status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED ||
        status === CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED
      ) {
        router.refresh();
        onClose();
        return;
      }

      setErrorMessage(
        status === CATEGORY_UNIT_UPDATE_STATUS.OCCUPIED
          ? CATEGORY_UNITS_COPY.MAINTENANCE_OCCUPIED
          : CATEGORY_UNITS_COPY.MODIFY_NOT_CORRECTABLE
      );
    } catch {
      setErrorMessage(CATEGORY_UNITS_COPY.MODIFY_ERROR);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    errorMessage,
    handleReturnToService: () => {
      void change(false);
    },
    handleSendToMaintenance: () => {
      void change(true);
    },
    isSaving,
  };
};
