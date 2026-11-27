"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ExtraCompatibilityUnits } from "../models/ExtraCompatibilityUnits.interface";
import type { ExtraCompatibilityUnitsFormViewModel } from "../models/ExtraCompatibilityUnitsFormViewModel.interface";
import { buildExtraCompatibilityUnitOptions } from "../utils/buildExtraCompatibilityUnitOptions";
import { hasExtraCompatibilityChanges } from "../utils/hasExtraCompatibilityChanges";
import { listExtraCompatibilityUnitIds } from "../utils/listExtraCompatibilityUnitIds";
import { listLinkedExtraCompatibilityUnitIds } from "../utils/listLinkedExtraCompatibilityUnitIds";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import { toggleExtraCompatibilityUnitId } from "../utils/toggleExtraCompatibilityUnitId";
import { useExtraCompatibilityUnitsSubmit } from "./useExtraCompatibilityUnitsSubmit";

export const useExtraCompatibilityUnitsFormViewModel = ({
  category,
  extra,
  units,
}: ExtraCompatibilityUnits): ExtraCompatibilityUnitsFormViewModel => {
  const router = useRouter();
  const savedUnitIds =
    listLinkedExtraCompatibilityUnitIds(units);
  const [selectedUnitIds, setSelectedUnitIds] =
    useState<string[]>(savedUnitIds);
  const hasChanges = hasExtraCompatibilityChanges(
    savedUnitIds,
    selectedUnitIds
  );

  const { isSubmitting, onSubmit } =
    useExtraCompatibilityUnitsSubmit({
      hasChanges,
      input: {
        extraId: extra.id,
        categoryId: category.id,
        unitIds: selectedUnitIds,
      },
    });

  const onToggleUnit = (unitId: string): void => {
    setSelectedUnitIds((currentUnitIds) =>
      toggleExtraCompatibilityUnitId(currentUnitIds, unitId)
    );
  };

  const onSelectAll = (): void => {
    setSelectedUnitIds(
      listExtraCompatibilityUnitIds(units)
    );
  };

  const onClearAll = (): void => {
    setSelectedUnitIds([]);
  };

  const onBack = (): void => {
    router.push(resolveExtraCompatibilityPath(extra.id));
  };

  return {
    hasChanges,
    isSubmitting,
    onBack,
    onClearAll,
    onSelectAll,
    onSubmit,
    onToggleUnit,
    options: buildExtraCompatibilityUnitOptions(
      units,
      selectedUnitIds
    ),
  };
};
