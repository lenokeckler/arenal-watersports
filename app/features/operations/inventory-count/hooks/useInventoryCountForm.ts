"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import { submitInventoryCount } from "../actions/submitInventoryCount";
import {
  INVENTORY_COUNT_RESULT,
  type InventoryCountQuantityField,
  type InventoryCountResult,
} from "../constants/InventoryCount.constants";
import type { InventoryCountChangeEvent } from "../models/InventoryCountChangeEvent.type";
import type { InventoryCountDraft } from "../models/InventoryCountDraft.interface";
import type { InventoryCountForm } from "../models/InventoryCountForm.interface";
import type { InventoryCountFormProps } from "../models/InventoryCountFormProps.interface";
import { buildInventoryCountDraft } from "../utils/buildInventoryCountDraft";
import { buildInventoryCountInput } from "../utils/buildInventoryCountInput";

export const useInventoryCountForm = ({
  categories,
}: InventoryCountFormProps): InventoryCountForm => {
  const router = useRouter();
  const [draft, setDraft] = useState<InventoryCountDraft>(
    () => buildInventoryCountDraft(categories)
  );
  const [showErrors, setShowErrors] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] =
    useState<NullableRef<InventoryCountResult>>(null);

  const build = useMemo(
    () => buildInventoryCountInput(categories, draft),
    [categories, draft]
  );

  const currentCategory = categories[stepIndex] ?? null;
  const isSummaryStep = currentCategory === null;

  const goToNextStep = (): void => {
    if (
      currentCategory !== null &&
      build.invalidCategoryIds.has(currentCategory.id)
    ) {
      setShowErrors(true);

      return;
    }

    setResult(null);
    setStepIndex((current) =>
      Math.min(current + 1, categories.length)
    );
  };

  const goToPreviousStep = (): void => {
    setResult(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const submit = async (): Promise<void> => {
    if (build.input === null) {
      setShowErrors(true);
      setStepIndex(
        Math.max(
          categories.findIndex((category) =>
            build.invalidCategoryIds.has(category.id)
          ),
          0
        )
      );

      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const outcome = await submitInventoryCount(
        build.input
      );
      setResult(outcome);

      if (outcome === INVENTORY_COUNT_RESULT.RECORDED) {
        setShowErrors(false);
        router.refresh();
      }
    } catch {
      setResult(INVENTORY_COUNT_RESULT.FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentCategory,
    draft,
    goToNextStep,
    goToPreviousStep,
    isSummaryStep,
    stepCount: categories.length + 1,
    stepIndex,
    handleNotesChange: (
      event: InventoryCountChangeEvent
    ): void => {
      setDraft((current) => ({
        ...current,
        notes: event.target.value,
      }));
    },
    handleQuantityChange:
      (
        categoryId: string,
        field: InventoryCountQuantityField
      ) =>
      (event: InventoryCountChangeEvent): void => {
        setResult(null);
        setDraft((current) => ({
          ...current,
          quantities: {
            ...current.quantities,
            [categoryId]: {
              ...current.quantities[categoryId],
              [field]: event.target.value,
            },
          },
        }));
      },
    handleSubmit: (
      event: FormEvent<HTMLFormElement>
    ): void => {
      event.preventDefault();
      void submit();
    },
    handleUnitStatusChange:
      (unitId: string) =>
      (event: InventoryCountChangeEvent): void => {
        setResult(null);
        setDraft((current) => ({
          ...current,
          unitStatuses: {
            ...current.unitStatuses,
            [unitId]: event.target.value,
          },
        }));
      },
    invalidCategoryIds: showErrors
      ? build.invalidCategoryIds
      : new Set<string>(),
    isSubmitting,
    result,
  };
};
