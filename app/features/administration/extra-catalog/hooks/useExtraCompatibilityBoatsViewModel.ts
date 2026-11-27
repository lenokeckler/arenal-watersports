"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import {
  BROWSER_EVENTS,
  LENGTH,
  PATHS,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityBoatsViewModel } from "../models/ExtraCompatibilityBoatsViewModel.interface";
import type { ExtraCompatibilityCategories } from "../models/ExtraCompatibilityCategories.interface";
import type { ExtraCompatibilitySelection } from "../models/ExtraCompatibilitySelection.type";
import { buildExtraCompatibilityProgressLabel } from "../utils/buildExtraCompatibilityProgressLabel";
import { buildExtraCompatibilitySelection } from "../utils/buildExtraCompatibilitySelection";
import { buildExtraCompatibilityUnitOptions } from "../utils/buildExtraCompatibilityUnitOptions";
import { countExtraCompatibilityChanges } from "../utils/countExtraCompatibilityChanges";
import { hasExtraCompatibilityChanges } from "../utils/hasExtraCompatibilityChanges";
import { listExtraCompatibilityUnitIds } from "../utils/listExtraCompatibilityUnitIds";
import { resolveInitialOpenCategoryIds } from "../utils/resolveInitialOpenCategoryIds";
import { saveExtraCompatibilityChanges } from "../utils/saveExtraCompatibilityChanges";
import { toggleExtraCompatibilityUnitId } from "../utils/toggleExtraCompatibilityUnitId";

const resolveDirtyLabel = (
  changeCount: number
): NullableRef<string> => {
  if (changeCount === LENGTH.ZERO) {
    return null;
  }

  return changeCount === LENGTH.ONE
    ? EXTRA_COMPATIBILITY_COPY.DIRTY_ONE
    : EXTRA_COMPATIBILITY_COPY.DIRTY_MANY(changeCount);
};

const preventUnload = (event: BeforeUnloadEvent): void => {
  event.preventDefault();
};

export const useExtraCompatibilityBoatsViewModel = ({
  categories,
  extra,
}: ExtraCompatibilityCategories): ExtraCompatibilityBoatsViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [saved, setSaved] =
    useState<ExtraCompatibilitySelection>(() =>
      buildExtraCompatibilitySelection(categories)
    );
  const [selected, setSelected] =
    useState<ExtraCompatibilitySelection>(saved);
  const [openIds, setOpenIds] = useState<string[]>(() =>
    resolveInitialOpenCategoryIds(categories)
  );
  const [isLeaveSheetOpen, setIsLeaveSheetOpen] =
    useState(false);
  const changeCount = countExtraCompatibilityChanges(
    saved,
    selected
  );
  const isDirty = changeCount > LENGTH.ZERO;

  useEffect(() => {
    if (isDirty) {
      window.addEventListener(
        BROWSER_EVENTS.BEFORE_UNLOAD,
        preventUnload
      );
    }

    return () => {
      window.removeEventListener(
        BROWSER_EVENTS.BEFORE_UNLOAD,
        preventUnload
      );
    };
  }, [isDirty]);

  const setCategoryUnits = (
    categoryId: string,
    unitIds: string[]
  ): void => {
    setSelected((current) => ({
      ...current,
      [categoryId]: unitIds,
    }));
  };

  const save = async (): Promise<boolean> => {
    let isSaved = false;

    await runLocked(async () => {
      const changes = categories
        .filter((category) =>
          hasExtraCompatibilityChanges(
            saved[category.id],
            selected[category.id]
          )
        )
        .map((category) => ({
          categoryId: category.id,
          unitIds: selected[category.id],
        }));

      isSaved = await saveExtraCompatibilityChanges({
        changes,
        extraId: extra.id,
        showToast,
      });

      if (isSaved) {
        setSaved(selected);
        router.refresh();
      }
    });

    return isSaved;
  };

  const goToExtras = (): void => {
    router.push(PATHS.ADMINISTRATION.EXTRAS);
  };

  const markedTotal = categories.reduce(
    (total, category) =>
      total + selected[category.id].length,
    0
  );
  const unitTotal = categories.reduce(
    (total, category) => total + category.unitCount,
    0
  );

  return {
    dirtyLabel: resolveDirtyLabel(changeCount),
    groups: categories.map((category) => ({
      id: category.id,
      isOpen: openIds.includes(category.id),
      markedCount: selected[category.id].length,
      name: category.name,
      onClearAll: () => setCategoryUnits(category.id, []),
      onSelectAll: () =>
        setCategoryUnits(
          category.id,
          listExtraCompatibilityUnitIds(category.units)
        ),
      onToggleOpen: () =>
        setOpenIds((current) =>
          toggleExtraCompatibilityUnitId(
            current,
            category.id
          )
        ),
      onToggleUnit: (unitId) =>
        setCategoryUnits(
          category.id,
          toggleExtraCompatibilityUnitId(
            selected[category.id],
            unitId
          )
        ),
      options: buildExtraCompatibilityUnitOptions(
        category.units,
        selected[category.id]
      ),
      progressLabel: buildExtraCompatibilityProgressLabel(
        selected[category.id].length,
        category.unitCount
      ),
    })),
    isLeaveSheetOpen,
    isSubmitting,
    onBack: () => {
      if (isDirty) {
        setIsLeaveSheetOpen(true);
        return;
      }
      goToExtras();
    },
    onLeaveDiscard: () => {
      window.removeEventListener(
        BROWSER_EVENTS.BEFORE_UNLOAD,
        preventUnload
      );
      goToExtras();
    },
    onLeaveSave: async () => {
      if (await save()) {
        goToExtras();
      }
    },
    onLeaveStay: () => setIsLeaveSheetOpen(false),
    onSave: async () => {
      await save();
    },
    totalLabel: EXTRA_COMPATIBILITY_COPY.BOATS_TOTAL(
      markedTotal,
      unitTotal
    ),
  };
};
