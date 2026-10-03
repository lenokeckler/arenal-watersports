"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS, STATUS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { EMPTY_CATEGORY_CREATE_FORM_VALUES } from "../constants/EmptyCategoryCreateFormValues.constants";
import type { CategoryCreateFormErrors } from "../models/CategoryCreateFormErrors.interface";
import type { CategoryCreateFormValues } from "../models/CategoryCreateFormValues.interface";
import type { CategoryCreateFormViewModel } from "../models/CategoryCreateFormViewModel.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import type { CreateCategoryInput } from "../models/CreateCategoryInput.interface";
import type { CreateCategoryResult } from "../models/CreateCategoryResult.interface";
import { createCategoryAction } from "../services/createCategoryAction";
import { validateCategoryCreateFormValues } from "../utils/validateCategoryCreateFormValues";

const buildCreateCategoryInput = (
  values: CategoryCreateFormValues
): CreateCategoryInput => ({
  name: values.name,
  trackingMode: values.trackingMode as CategoryTrackingMode,
  groupName: values.groupName,
});

export const useCategoryCreateFormViewModel =
  (): CategoryCreateFormViewModel => {
    const router = useRouter();
    const { showToast } = useToast();
    const [values, setValues] =
      useState<CategoryCreateFormValues>(
        EMPTY_CATEGORY_CREATE_FORM_VALUES
      );
    const [errors, setErrors] =
      useState<CategoryCreateFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearFieldError = (
      fieldName: keyof CategoryCreateFormErrors
    ): void => {
      setErrors((currentErrors) => {
        if (!currentErrors[fieldName]) {
          return currentErrors;
        }

        const updatedErrors = { ...currentErrors };
        delete updatedErrors[fieldName];
        return updatedErrors;
      });
    };

    const updateFieldValue = (
      fieldName: keyof CategoryCreateFormValues,
      fieldValue: string
    ): void => {
      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: fieldValue,
      }));
      clearFieldError(fieldName);
    };

    const onNameChange = (
      event: CategoryFormFieldChangeEvent
    ): void => {
      updateFieldValue("name", event.target.value);
    };

    const onTrackingModeChange = (
      event: CategoryFormFieldChangeEvent
    ): void => {
      updateFieldValue("trackingMode", event.target.value);
    };

    const onGroupNameChange = (
      event: CategoryFormFieldChangeEvent
    ): void => {
      updateFieldValue("groupName", event.target.value);
    };

    const onBack = (): void => {
      router.push(PATHS.ADMINISTRATION.CATEGORIES);
    };

    const handleCreateCategoryResult = (
      result: CreateCategoryResult
    ): void => {
      if (
        result.status === CATEGORY_MUTATION_STATUS.SUCCESS
      ) {
        showToast(
          STATUS.SUCCESS,
          CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
        );
        router.push(PATHS.ADMINISTRATION.CATEGORIES);
        return;
      }

      if (result.groupNameError) {
        setErrors({ groupName: result.groupNameError });
        return;
      }

      showToast(
        STATUS.ERROR,
        CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
      );
    };

    const onSubmit = async (
      event: React.FormEvent
    ): Promise<void> => {
      event.preventDefault();

      const validationErrors =
        validateCategoryCreateFormValues(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      try {
        const result = await createCategoryAction(
          buildCreateCategoryInput(values)
        );
        handleCreateCategoryResult(result);
      } catch {
        showToast(
          STATUS.ERROR,
          CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    return {
      values,
      errors,
      isSubmitting,
      onBack,
      onNameChange,
      onTrackingModeChange,
      onGroupNameChange,
      onSubmit,
    };
  };
