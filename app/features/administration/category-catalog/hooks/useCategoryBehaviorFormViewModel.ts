"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import type { CategoryBehaviorFormViewModel } from "../models/CategoryBehaviorFormViewModel.interface";
import type { CategoryBehaviorFormViewModelProps } from "../models/CategoryBehaviorFormViewModelProps.interface";
import { useCategoryBehaviorFormFields } from "./useCategoryBehaviorFormFields";
import { useCategoryBehaviorFormSubmit } from "./useCategoryBehaviorFormSubmit";

export const useCategoryBehaviorFormViewModel = ({
  behavior,
}: CategoryBehaviorFormViewModelProps): CategoryBehaviorFormViewModel => {
  const router = useRouter();
  const { showValidationErrors, ...fields } =
    useCategoryBehaviorFormFields({ behavior });
  const { isSubmitting, onSubmit } =
    useCategoryBehaviorFormSubmit({
      categoryId: behavior.id,
      values: fields.values,
      onValidationErrors: showValidationErrors,
    });

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.CATEGORIES);
  };

  return {
    ...fields,
    trackingMode: behavior.trackingMode,
    isSubmitting,
    onBack,
    onSubmit,
  };
};
