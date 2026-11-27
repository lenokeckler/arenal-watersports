"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseUsageInput } from "@/app/components/dispatch-board/utils/parseUsageInput";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";
import { submitBoardUnitReceive } from "../actions/submitBoardUnitReceive";
import { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import type { CategoryUnitReceiveViewModel } from "../models/CategoryUnitReceiveViewModel.interface";

interface CategoryUnitReceiveInput {
  onReceived: () => void;
  readings: CategoryUnitReadings;
  unitId: string;
}

export const useCategoryUnitReceive = ({
  onReceived,
  readings,
  unitId,
}: CategoryUnitReceiveInput): CategoryUnitReceiveViewModel => {
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
  const [hasDamage, setHasDamage] = useState(false);
  const [damageText, setDamageText] = useState<string>(
    STRING.Empty
  );
  const [damageCause, setDamageCause] =
    useState<BoardUnitReceiveInput["damageCause"]>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const hasUsage = readings.usageMetric !== null;
  const usageTotal = hasUsage
    ? parseUsageInput(usageText)
    : null;
  const hasValidUsage = !hasUsage || usageTotal !== null;
  const hasValidDamage =
    !hasDamage ||
    (damageCause !== null &&
      damageText.trim() !== STRING.Empty);
  const canSaveLater =
    hasValidUsage &&
    (!readings.hasFuelGauge || fuelLevel !== null) &&
    !isSaving;
  const canSave = canSaveLater && hasValidDamage;

  const handleSave = async (
    detailLater: boolean
  ): Promise<void> => {
    if (!(detailLater ? canSaveLater : canSave)) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const { status } = await submitBoardUnitReceive({
        damageCause,
        damageDescription: damageText,
        detailLater,
        fuelLevel: readings.hasFuelGauge ? fuelLevel : null,
        fuelMax: readings.fuelMax,
        hasDamage,
        impactCount,
        previousImpactCount: readings.impactCount,
        unitId,
        usageTotal,
      });

      if (status === CATEGORY_UNIT_UPDATE_STATUS.UPDATED) {
        router.refresh();
        onReceived();
      } else if (
        status ===
        CATEGORY_UNIT_UPDATE_STATUS.ALREADY_CLOSED
      ) {
        setErrorMessage(
          CATEGORY_UNITS_COPY.RECEIVE_NOT_OUT
        );
      } else {
        setErrorMessage(
          CATEGORY_UNITS_COPY.RECEIVE_INVALID
        );
      }
    } catch {
      setErrorMessage(CATEGORY_UNITS_COPY.RECEIVE_ERROR);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    canSave,
    canSaveLater,
    damageCause,
    handleDamageCauseChange: (value) =>
      setDamageCause(
        value as BoardUnitReceiveInput["damageCause"]
      ),
    handleSaveLater: () => {
      void handleSave(true);
    },
    damageText,
    errorMessage,
    fuelLevel,
    handleDamageTextChange: setDamageText,
    handleFuelLevelChange: setFuelLevel,
    handleHasDamageChange: setHasDamage,
    handleImpactCountChange: setImpactCount,
    handleSave: () => {
      void handleSave(false);
    },
    handleUsageChange: (event) => {
      setErrorMessage(null);
      setUsageText(event.target.value);
    },
    hasDamage,
    impactCount,
    isSaving,
    usageError:
      hasValidUsage || usageText.trim() === STRING.Empty
        ? null
        : CATEGORY_UNITS_COPY.MODIFY_USAGE_INVALID,
    usageText,
  };
};
