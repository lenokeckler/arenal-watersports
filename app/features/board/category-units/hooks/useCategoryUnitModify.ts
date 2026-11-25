"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseUsageInput } from "@/app/components/dispatch-board/utils/parseUsageInput";
import {
  INVENTORY_UNIT_STATUS,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitBoardUnitCorrection } from "../actions/submitBoardUnitCorrection";
import { submitBoardUnitMaintenance } from "../actions/submitBoardUnitMaintenance";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitModifyViewModel } from "../models/CategoryUnitModifyViewModel.interface";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import { resolveEditedUnitStatus } from "../utils/resolveEditedUnitStatus";

interface CategoryUnitModifyInput {
  onSaved: () => void;
  readings: NullableRef<CategoryUnitReadings>;
  unit: CategoryUnit;
}

const NO_FUEL_GAUGE_LEVEL = 0;
const NO_IMPACTS = 0;

export const useCategoryUnitModify = ({
  onSaved,
  readings,
  unit,
}: CategoryUnitModifyInput): CategoryUnitModifyViewModel => {
  const router = useRouter();
  const wasInMaintenance =
    unit.status === INVENTORY_UNIT_STATUS.IN_MAINTENANCE;
  const [fuelLevel, setFuelLevel] = useState<
    NullableRef<number>
  >(readings?.fuelLevel ?? null);
  const [impactCount, setImpactCount] = useState(
    readings?.impactCount ?? NO_IMPACTS
  );
  const [usageText, setUsageText] = useState(
    String(readings?.usageTotal ?? NO_IMPACTS)
  );
  const [inMaintenance, setInMaintenance] = useState(
    wasInMaintenance
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const hasUsageField =
    readings !== null && readings.usageMetric !== null;
  const usageTotal = hasUsageField
    ? parseUsageInput(usageText)
    : (readings?.usageTotal ?? null);
  const hasValidUsage =
    readings === null || usageTotal !== null;
  const hasMaintenanceChange =
    inMaintenance !== wasInMaintenance;
  const canChangeMaintenance =
    unit.status !== INVENTORY_UNIT_STATUS.OCCUPIED;
  const canSave =
    hasValidUsage &&
    (readings === null || !readings.hasFuelGauge
      ? true
      : fuelLevel !== null) &&
    (readings !== null || hasMaintenanceChange) &&
    !isSaving;

  const saveReadings = async (
    current: CategoryUnitReadings,
    currentUsage: number
  ): Promise<boolean> => {
    const { status } = await submitBoardUnitCorrection({
      fuelLevel: fuelLevel ?? NO_FUEL_GAUGE_LEVEL,
      fuelMax: current.fuelMax,
      impactCount,
      status: resolveEditedUnitStatus(
        unit.status,
        inMaintenance
      ),
      unitId: unit.id,
      usageTotal: currentUsage,
    });

    if (
      status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED ||
      status === CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED
    ) {
      return true;
    }

    setErrorMessage(
      status === CATEGORY_UNIT_UPDATE_STATUS.NOT_CORRECTABLE
        ? CATEGORY_UNITS_COPY.MODIFY_NOT_CORRECTABLE
        : CATEGORY_UNITS_COPY.MODIFY_INVALID
    );

    return false;
  };

  const saveMaintenance = async (): Promise<boolean> => {
    const { status } = await submitBoardUnitMaintenance({
      inMaintenance,
      unitId: unit.id,
    });

    if (
      status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED ||
      status === CATEGORY_UNIT_UPDATE_STATUS.UNCHANGED
    ) {
      return true;
    }

    setErrorMessage(
      status === CATEGORY_UNIT_UPDATE_STATUS.OCCUPIED
        ? CATEGORY_UNITS_COPY.MAINTENANCE_OCCUPIED
        : CATEGORY_UNITS_COPY.MODIFY_NOT_CORRECTABLE
    );

    return false;
  };

  const handleSave = async (): Promise<void> => {
    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const isMaintenanceSaved =
        !hasMaintenanceChange || (await saveMaintenance());
      const areReadingsSaved =
        !isMaintenanceSaved ||
        readings === null ||
        usageTotal === null ||
        (await saveReadings(readings, usageTotal));

      if (isMaintenanceSaved && areReadingsSaved) {
        router.refresh();
        onSaved();
      }
    } catch {
      setErrorMessage(CATEGORY_UNITS_COPY.MODIFY_ERROR);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    canChangeMaintenance,
    canSave,
    errorMessage,
    fuelLevel,
    handleFuelLevelChange: setFuelLevel,
    handleImpactCountChange: setImpactCount,
    handleMaintenanceChange: setInMaintenance,
    handleSave: () => {
      void handleSave();
    },
    handleUsageChange: (event) => {
      setErrorMessage(null);
      setUsageText(event.target.value);
    },
    impactCount,
    inMaintenance,
    isSaving,
    usageError:
      hasValidUsage || usageText.trim() === STRING.Empty
        ? null
        : CATEGORY_UNITS_COPY.MODIFY_USAGE_INVALID,
    usageText,
  };
};
