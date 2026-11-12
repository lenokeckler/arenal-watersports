"use client";

import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import { useMemo } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useReservationFormFields } from "./useReservationFormFields";
import { useReservationFormSubmission } from "./useReservationFormSubmission";
import { useReservationDuration } from "./useReservationDuration";
import { useReservationEquipmentViewModel } from "./useReservationEquipmentViewModel";
import { STRING } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormViewModelOptions } from "../models/ReservationFormViewModelOptions.interface";
import { useReservationEquipmentEligibility } from "./useReservationEquipmentEligibility";
import { useReservationFormEquipmentSelection } from "./useReservationFormEquipmentSelection";
import { isReservationQuantityUnavailable } from "../utils/isReservationQuantityUnavailable";
import { filterReservationCategoriesByType } from "../utils/filterReservationCategoriesByType";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useCustomComboForm } from "./useCustomComboForm";
import { usePredefinedComboForm } from "./usePredefinedComboForm";
import { useReservationExtrasViewModel } from "./useReservationExtrasViewModel";
import { createReservationCreateSubmitHandler } from "../utils/createReservationCreateSubmitHandler";
import { resolveReservationCategoryInterchangeability } from "../utils/resolveReservationCategoryInterchangeability";

export const useReservationFormViewModel = (
  options: ReservationFormViewModelOptions
): ReservationFormViewModel => {
  const {
    categories,
    initialCategoryId,
    initialDate,
    predefinedCombos = [],
    unitCategories,
  } = options;
  const router = useRouter();
  const submission = useReservationFormSubmission();
  const eligibility =
    useReservationEquipmentEligibility(categories);
  const eligibleCategories =
    resolveReservationCategoryInterchangeability(
      eligibility.categories,
      unitCategories
    );
  const fields = useReservationFormFields(
    initialDate,
    initialCategoryId,
    submission.clearFieldError,
    {
      guideOptions: options.guideOptions,
      liveCategories: eligibleCategories,
    }
  );
  const categoriesForReservationType =
    filterReservationCategoriesByType(
      eligibleCategories,
      fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL
    );
  const duration = useReservationDuration(
    fields.handleDurationChange,
    submission.clearFieldError
  );
  const equipment = useReservationEquipmentViewModel(
    categoriesForReservationType,
    fields.values,
    duration.resolveDurationHours(
      fields.values.durationHours
    ),
    eligibility.refreshKey
  );
  const resolvedDurationHours =
    duration.resolveDurationHours(
      fields.values.durationHours
    );
  const isCustomCombo =
    fields.values.reservationType ===
    RESERVATION_TYPE.COMBO;
  const { clearExtraSelection } = fields;
  const extraIds = useMemo(
    () => fields.values.extraIds ?? [],
    [fields.values.extraIds]
  );
  const customCombo = useCustomComboForm({
    categories: eligibleCategories,
    clearFieldError: submission.clearFieldError,
    durationHours: resolvedDurationHours,
    onGuideIdsChange: fields.handleGuideIdsChange,
    reservationType:
      fields.values.reservationType ??
      RESERVATION_TYPE.RENTAL,
  });
  const extraUnitId = isCustomCombo
    ? customCombo.extraUnitId
    : fields.values.unitId || null;
  const previousExtraUnitId = useRef(extraUnitId);
  useEffect(() => {
    if (previousExtraUnitId.current === extraUnitId) {
      return;
    }
    previousExtraUnitId.current = extraUnitId;
    if (isCustomCombo || submission.isSubmitted) {
      return;
    }
    clearExtraSelection();
  }, [
    clearExtraSelection,
    extraUnitId,
    isCustomCombo,
    submission.isSubmitted,
  ]);
  const extras = useReservationExtrasViewModel({
    durationHours: resolvedDurationHours,
    extraIds,
    reservationType: fields.values.reservationType,
    unitId: extraUnitId ?? STRING.Empty,
  });
  const predefinedCombo = usePredefinedComboForm(
    predefinedCombos,
    isCustomCombo,
    fields.handleGuideIdsChange,
    () => submission.setSubmissionError(STRING.Empty)
  );
  const isQuantityUnavailable =
    isReservationQuantityUnavailable(
      categoriesForReservationType.find(
        (category) =>
          category.id === fields.values.categoryId
      )?.isInterchangeable === true,
      fields.values.quantity,
      equipment.categoryAvailability
    );
  const selection = useReservationFormEquipmentSelection({
    availableUnits: equipment.availableUnits,
    categories: categoriesForReservationType,
    isAvailabilityResolved:
      equipment.isAvailabilityResolved,
    isEligibilityError: eligibility.hasError,
    isEligibilityLoading: eligibility.isLoading,
    selectedCategoryId: fields.values.categoryId,
    selectedUnitId: fields.values.unitId,
    onCategoryChange: fields.handleCategoryChange,
    onUnitChange: fields.handleUnitChange,
  });
  const isSubmitDisabled =
    submission.isPending ||
    (!isCustomCombo &&
      (categoriesForReservationType.length === 0 ||
        (equipment.requiresConcreteUnit &&
          (equipment.isAvailabilityLoading ||
            equipment.hasAvailabilityError)) ||
        isQuantityUnavailable));
  const handleSubmit = createReservationCreateSubmitHandler(
    {
      applyResult: submission.applyResult,
      customCombo,
      durationHours: resolvedDurationHours,
      isQuantityUnavailable,
      onUnitUnavailable: () => {
        fields.handleUnitChange(STRING.Empty);
        equipment.retryUnitAvailability();
      },
      onSuccess: () => {
        predefinedCombo.reset();
        customCombo.reset();
        fields.reset();
        duration.reset();
        equipment.retryUnitAvailability();
      },
      predefinedCombo: {
        mode: predefinedCombo.mode,
        selectedComboId: predefinedCombo.selectedComboId,
      },
      requestErrorFocus: submission.requestErrorFocus,
      requiresConcreteUnit: equipment.requiresConcreteUnit,
      setFieldError: submission.setFieldError,
      setSubmissionError: submission.setSubmissionError,
      submitPredefinedComboReservation:
        submission.submitPredefinedComboReservation,
      submitCustomComboReservation:
        submission.submitCustomComboReservation,
      submitReservation: submission.submitReservation,
      values: fields.values,
    }
  );
  return {
    categories: categoriesForReservationType,
    customCombo,
    extras,
    predefinedCombo,
    resolvedDurationHours,
    ...fields,
    handleReservationTypeChange: (value) => {
      if (value !== RESERVATION_TYPE.COMBO) {
        predefinedCombo.reset();
      }
      fields.handleReservationTypeChange(
        value,
        eligibleCategories
      );
    },
    ...submission,
    errors: isQuantityUnavailable
      ? {
          ...submission.errors,
          [RESERVATION_FORM_FIELD.QUANTITY]:
            RESERVATION_FORM_UI_COPY.QUANTITY_UNAVAILABLE,
        }
      : submission.errors,
    ...equipment,
    isEquipmentEligibilityLoading: eligibility.isLoading,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged: selection.hasChanged,
    handleRetryEquipmentEligibility: eligibility.retry,
    handleCategoryChange: selection.handleCategoryChange,
    handleUnitChange: selection.handleUnitChange,
    isSubmitDisabled,
    customDurationDraft: duration.customDurationDraft,
    handleCustomDurationSelection: () => {
      duration.selectCustomDuration();
      fields.handleUnitChange(STRING.Empty);
    },
    handleCustomDurationChange: (value: string) => {
      duration.updateCustomDurationDraft(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleDurationChange: (value: number) => {
      duration.selectPreset(value);
      fields.handleUnitChange(STRING.Empty);
    },
    handleBack: router.back,
    isCustomDuration: duration.isCustomDuration,
    handleSubmit,
  };
};
