"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import type { CategoryAlertFormViewModel } from "../models/CategoryAlertFormViewModel.interface";
import type { CategoryAlertFormViewModelProps } from "../models/CategoryAlertFormViewModelProps.interface";
import { useCategoryAlertFormFields } from "./useCategoryAlertFormFields";
import { useCategoryAlertFormSubmit } from "./useCategoryAlertFormSubmit";

export const useCategoryAlertFormViewModel = ({
  alerts,
}: CategoryAlertFormViewModelProps): CategoryAlertFormViewModel => {
  const router = useRouter();
  const { showValidationErrors, ...fields } =
    useCategoryAlertFormFields({ alerts });
  const { isSubmitting, onSubmit } =
    useCategoryAlertFormSubmit({
      categoryId: alerts.id,
      values: fields.values,
      onValidationErrors: showValidationErrors,
    });

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.CATEGORIES);
  };

  return {
    ...fields,
    isSubmitting,
    onBack,
    onSubmit,
  };
};
