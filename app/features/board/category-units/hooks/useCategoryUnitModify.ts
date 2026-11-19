"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseUsageInput } from "@/app/components/dispatch-board/utils/parseUsageInput";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitBoardUnitCorrection } from "../actions/submitBoardUnitCorrection";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitModifyViewModel } from "../models/CategoryUnitModifyViewModel.interface";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import { resolveRecordedUnitStatus } from "../utils/resolveRecordedUnitStatus";

interface CategoryUnitModifyInput {
  onSaved: () => void;
  readings: CategoryUnitReadings;
  unit: CategoryUnit;
}

const NO_FUEL_GAUGE_LEVEL = 0;

export const useCategoryUnitModify = ({
  onSaved,
  readings,
  unit,
}: CategoryUnitModifyInput): CategoryUnitModifyViewModel => {
  const router = useRouter();
  const [fuelLevel, setFuelLevel] = useState<
    NullableRef<number>
  >(readings.fuelLevel);
  const [impactCount, setImpactCount] = useState(
    readings.impactCount
  );
  const [usageText, setUsageText] = useState(
    String(readings.usageTotal)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const usageTotal =
    readings.usageMetric === null
      ? readings.usageTotal
      : parseUsageInput(usageText);
  const hasValidUsage = usageTotal !== null;
  const canSave =
    hasValidUsage &&
    (!readings.hasFuelGauge || fuelLevel !== null) &&
    !isSaving;

  const handleSave = async (): Promise<void> => {
    if (usageTotal === null || !canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const { status } = await submitBoardUnitCorrection({
        fuelLevel: fuelLevel ?? NO_FUEL_GAUGE_LEVEL,
        fuelMax: readings.fuelMax,
        impactCount,
        status: resolveRecordedUnitStatus(unit.status),
        unitId: unit.id,
        usageTotal,
      });

      if (
        status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED ||
        status === CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED
      ) {
        router.refresh();
        onSaved();
      } else if (
        status ===
        CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE
      ) {
        setErrorMessage(
          CATEGORY_UNITS_COPY.MODIFY_NOT_CORRECTABLE
        );
      } else {
        setErrorMessage(CATEGORY_UNITS_COPY.MODIFY_INVALID);
      }
    } catch {
      setErrorMessage(CATEGORY_UNITS_COPY.MODIFY_ERROR);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    canSave,
    errorMessage,
    fuelLevel,
    handleFuelLevelChange: setFuelLevel,
    handleImpactCountChange: setImpactCount,
    handleSave: () => {
      void handleSave();
    },
    handleUsageChange: (event) => {
      setErrorMessage(null);
      setUsageText(event.target.value);
    },
    impactCount,
    isSaving,
    usageError:
      hasValidUsage || usageText.trim() === STRING.Empty
        ? null
        : CATEGORY_UNITS_COPY.MODIFY_USAGE_INVALID,
    usageText,
  };
};
