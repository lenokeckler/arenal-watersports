"use client";

import { useState } from "react";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import type { DispatchUnitSelectionViewModel } from "../models/DispatchUnitSelectionViewModel.interface";
import { buildInitialUnitSelection } from "../utils/buildInitialUnitSelection";
import { getInitialTakeCount } from "../utils/getInitialTakeCount";
import { isTakeAdjustable } from "../utils/isTakeAdjustable";

interface DispatchUnitSelectionInput {
  group: DispatchSheetGroup;
  preselectedUnitIds: string[];
}

const SINGLE_UNIT = 1;

export const useDispatchUnitSelection = ({
  group,
  preselectedUnitIds,
}: DispatchUnitSelectionInput): DispatchUnitSelectionViewModel => {
  const [takeCount, setTakeCount] = useState(() =>
    getInitialTakeCount(group, preselectedUnitIds.length)
  );
  const [selectedUnitIds, setSelectedUnitIds] = useState<
    string[]
  >(() =>
    buildInitialUnitSelection(
      group,
      preselectedUnitIds,
      takeCount
    )
  );
  const isAdjustable = isTakeAdjustable(group);
  const targetCount = group.isTrackedByUnit
    ? group.fixedUnitIds.length + takeCount
    : 0;

  const changeTakeCount = (nextCount: number): void => {
    setTakeCount(nextCount);
    setSelectedUnitIds((current) =>
      current.slice(
        0,
        group.fixedUnitIds.length + nextCount
      )
    );
  };

  const handleToggleUnit = (unitId: string): void => {
    if (group.fixedUnitIds.includes(unitId)) {
      return;
    }

    setSelectedUnitIds((current) => {
      if (current.includes(unitId)) {
        return current.filter((id) => id !== unitId);
      }

      return current.length >= targetCount
        ? current
        : [...current, unitId];
    });
  };

  return {
    handleResetUnits: () =>
      setSelectedUnitIds(group.fixedUnitIds),
    handleToggleUnit,
    isSelectionComplete:
      selectedUnitIds.length === targetCount,
    selectedUnitIds,
    take: {
      canTakeLess: isAdjustable && takeCount > SINGLE_UNIT,
      canTakeMore:
        isAdjustable && takeCount < group.requiredQuantity,
      count: takeCount,
      handleTakeLess: () =>
        changeTakeCount(takeCount - SINGLE_UNIT),
      handleTakeMore: () =>
        changeTakeCount(takeCount + SINGLE_UNIT),
      isAdjustable,
      pendingAfter: group.requiredQuantity - takeCount,
    },
    targetCount,
  };
};
