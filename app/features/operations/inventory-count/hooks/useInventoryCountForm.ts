"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import type { NullableRef } from "@/app/types";
import { submitInventoryCount } from "../actions/submitInventoryCount";
import {
  INVENTORY_COUNT_RESULT,
  type InventoryCountQuantityField,
  type InventoryCountResult,
  type InventoryCountUnitStatus,
} from "../constants/InventoryCount.constants";
import type { InventoryCountChangeEvent } from "../models/InventoryCountChangeEvent.type";
import type { InventoryCountDraft } from "../models/InventoryCountDraft.interface";
import type { InventoryCountForm } from "../models/InventoryCountForm.interface";
import type { InventoryCountFormProps } from "../models/InventoryCountFormProps.interface";
import { buildInventoryCountDraft } from "../utils/buildInventoryCountDraft";
import { buildInventoryCountInput } from "../utils/buildInventoryCountInput";
import {
  clearInventoryCountDraft,
  loadInventoryCountDraft,
  saveInventoryCountDraft,
} from "../utils/inventoryCountDraftStorage";
import { resetCategoryToSystem } from "../utils/resetCategoryToSystem";

export const useInventoryCountForm = ({
  categories,
}: InventoryCountFormProps): InventoryCountForm => {
  const router = useRouter();
  const [stored] = useState(() =>
    loadInventoryCountDraft(categories)
  );
  const [draft, setDraft] = useState<InventoryCountDraft>(
    () =>
      stored?.draft ?? buildInventoryCountDraft(categories)
  );
  const [reviewedIds, setReviewedIds] = useState<string[]>(
    () => stored?.reviewedIds ?? []
  );
  const [selectedId, setSelectedId] =
    useState<NullableRef<string>>(null);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] =
    useState<NullableRef<InventoryCountResult>>(null);

  useEffect(() => {
    saveInventoryCountDraft({ draft, reviewedIds });
  }, [draft, reviewedIds]);

  const build = useMemo(
    () => buildInventoryCountInput(categories, draft),
    [categories, draft]
  );

  const activeCategory =
    categories.find(
      (category) => category.id === selectedId
    ) ??
    categories.find(
      (category) => !reviewedIds.includes(category.id)
    ) ??
    null;
  const pendingCount =
    categories.length - reviewedIds.length;

  const markReviewed = (
    categoryId: string,
    nextDraft: InventoryCountDraft
  ): void => {
    const reviewed = reviewedIds.includes(categoryId)
      ? reviewedIds
      : [...reviewedIds, categoryId];
    const nextPending = categories.find(
      (category) => !reviewed.includes(category.id)
    );

    setDraft(nextDraft);
    setReviewedIds(reviewed);
    setResult(null);
    setSelectedId(nextPending?.id ?? null);
  };

  const unreview = (categoryId: string): void => {
    setResult(null);
    setReviewedIds((current) =>
      current.filter((id) => id !== categoryId)
    );
  };

  const submit = async (): Promise<void> => {
    if (build.input === null) {
      setShowErrors(true);

      return;
    }

    if (isSubmitting || pendingCount > 0) {
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const outcome = await submitInventoryCount({
        ...build.input,
        notes: draft.notes,
      });
      setResult(outcome);

      if (outcome === INVENTORY_COUNT_RESULT.RECORDED) {
        clearInventoryCountDraft();
        router.refresh();
      }
    } catch {
      setResult(INVENTORY_COUNT_RESULT.FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    canRegister: pendingCount === 0,
    isPanelOpen: selectedId !== null,
    closeCategory: () => setSelectedId(null),
    confirmCategory: () => {
      if (
        activeCategory === null ||
        build.invalidCategoryIds.has(activeCategory.id)
      ) {
        setShowErrors(true);

        return;
      }

      markReviewed(activeCategory.id, draft);
    },
    draft,
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
        unreview(categoryId);
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
    invalidCategoryIds: showErrors
      ? build.invalidCategoryIds
      : new Set<string>(),
    isSubmitting,
    matchAll: () => {
      if (activeCategory !== null) {
        markReviewed(
          activeCategory.id,
          resetCategoryToSystem(draft, activeCategory)
        );
      }
    },
    openCategory: setSelectedId,
    pendingCount,
    result,
    reviewedIds: new Set(reviewedIds),
    selectedCategory: activeCategory,
    setUnitStatus: (
      categoryId: string,
      unitId: string,
      status: InventoryCountUnitStatus
    ): void => {
      unreview(categoryId);
      setDraft((current) => ({
        ...current,
        unitStatuses: {
          ...current.unitStatuses,
          [unitId]: status,
        },
      }));
    },
  };
};
