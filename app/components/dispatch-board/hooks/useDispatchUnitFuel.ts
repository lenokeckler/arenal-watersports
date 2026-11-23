"use client";

import { useState } from "react";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import type { DispatchUnitFuelViewModel } from "../models/DispatchUnitFuelViewModel.interface";

interface DispatchUnitFuelInput {
  group: DispatchSheetGroup;
  selectedUnitIds: string[];
}

export const useDispatchUnitFuel = ({
  group,
  selectedUnitIds,
}: DispatchUnitFuelInput): DispatchUnitFuelViewModel => {
  const [markedLevels, setMarkedLevels] = useState<
    Record<string, number>
  >({});
  const rows = group.consumesFuel
    ? group.candidateUnits
        .filter((unit) =>
          selectedUnitIds.includes(unit.unitId)
        )
        .map((unit) => ({
          code: unit.code,
          fuelLevel:
            markedLevels[unit.unitId] ?? unit.fuelLevel,
          fuelMax: unit.fuelMax,
          lowFuelLines: unit.lowFuelLines,
          unitId: unit.unitId,
        }))
    : [];

  return {
    areLevelsReady: rows.every(
      (row) => row.fuelLevel !== null
    ),
    buildReadings: () =>
      rows.map((row) => ({
        fuel: row.fuelLevel,
        unitId: row.unitId,
        usage: null,
      })),
    handleLevelChange: (unitId, level) =>
      setMarkedLevels((current) => ({
        ...current,
        [unitId]: level,
      })),
    rows,
  };
};
