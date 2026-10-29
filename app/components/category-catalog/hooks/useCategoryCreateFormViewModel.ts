"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import { EMPTY_CATEGORY_CREATE_FORM_VALUES } from "../constants/EmptyCategoryCreateFormValues.constants";
import type { CategoryCreateFormErrors } from "../models/CategoryCreateFormErrors.interface";
import type { CategoryCreateFormValues } from "../models/CategoryCreateFormValues.interface";
import type { CategoryCreateFormViewModel } from "../models/CategoryCreateFormViewModel.interface";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import type { CreateCategoryInput } from "../models/CreateCategoryInput.interface";
import { createCategoryAction } from "../services/createCategoryAction";
import { handleCreateCategoryResult } from "../utils/handleCreateCategoryResult";
import { showGenericMutationErrorToast } from "../utils/showGenericMutationErrorToast";
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
    const isSubmittingRef = useRef(false);

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

    const onSubmit = async (
      event: React.FormEvent
    ): Promise<void> => {
      event.preventDefault();

      if (isSubmittingRef.current) {
        return;
      }

      const validationErrors =
        validateCategoryCreateFormValues(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      isSubmittingRef.current = true;
      setIsSubmitting(true);

      try {
        const result = await createCategoryAction(
          buildCreateCategoryInput(values)
        );
        handleCreateCategoryResult(result, {
          showToast,
          onSuccess: () =>
            router.push(PATHS.ADMINISTRATION.CATEGORIES),
          onGroupNameError: (groupNameError) =>
            setErrors({ groupName: groupNameError }),
          onNameError: (nameError) =>
            setErrors({ name: nameError }),
        });
      } catch {
        showGenericMutationErrorToast(showToast);
      } finally {
        isSubmittingRef.current = false;
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
