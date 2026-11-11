"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import type { DispatchReadingDraft } from "../models/DispatchReadingDraft.interface";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import type { DispatchUnitReadingsViewModel } from "../models/DispatchUnitReadingsViewModel.interface";
import { buildDispatchReadingRow } from "../utils/buildDispatchReadingRow";

interface DispatchUnitReadingsInput {
  group: DispatchSheetGroup;
  selectedUnitIds: string[];
}

const EMPTY_DRAFT: DispatchReadingDraft = {
  fuel: STRING.Empty,
  usage: STRING.Empty,
};

export const useDispatchUnitReadings = ({
  group,
  selectedUnitIds,
}: DispatchUnitReadingsInput): DispatchUnitReadingsViewModel => {
  const [drafts, setDrafts] = useState<
    Record<string, DispatchReadingDraft>
  >({});
  const takesReadings =
    group.consumesFuel || group.usageMetric !== null;
  const rows = takesReadings
    ? group.candidateUnits
        .filter((unit) =>
          selectedUnitIds.includes(unit.unitId)
        )
        .map((unit) =>
          buildDispatchReadingRow(
            unit,
            drafts[unit.unitId] ?? EMPTY_DRAFT,
            group
          )
        )
    : [];
  const areReadingsComplete = rows.every(
    (row) =>
      (!group.consumesFuel || row.fuelLevel !== null) &&
      (group.usageMetric === null ||
        row.usageReading !== null)
  );

  const updateDraft = (
    unitId: string,
    change: Partial<DispatchReadingDraft>
  ): void => {
    setDrafts((current) => ({
      ...current,
      [unitId]: {
        ...(current[unitId] ?? EMPTY_DRAFT),
        ...change,
      },
    }));
  };

  return {
    areReadingsComplete,
    buildReadings: () =>
      rows.map((row) => ({
        fuel: row.fuelLevel,
        unitId: row.unitId,
        usage: row.usageReading,
      })),
    handleFuelChange: (unitId, text) =>
      updateDraft(unitId, { fuel: text }),
    handleUsageChange: (unitId, text) =>
      updateDraft(unitId, { usage: text }),
    rows,
  };
};
