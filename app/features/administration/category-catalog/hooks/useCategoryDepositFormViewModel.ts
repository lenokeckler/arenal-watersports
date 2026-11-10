"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import type { CategoryDepositFormViewModel } from "../models/CategoryDepositFormViewModel.interface";
import type { CategoryDepositFormViewModelProps } from "../models/CategoryDepositFormViewModelProps.interface";
import { useCategoryDepositFormFields } from "./useCategoryDepositFormFields";
import { useCategoryDepositFormSubmit } from "./useCategoryDepositFormSubmit";

export const useCategoryDepositFormViewModel = ({
  deposit,
}: CategoryDepositFormViewModelProps): CategoryDepositFormViewModel => {
  const router = useRouter();
  const { showValidationErrors, ...fields } =
    useCategoryDepositFormFields({ deposit });
  const { isSubmitting, onSubmit } =
    useCategoryDepositFormSubmit({
      categoryId: deposit.id,
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
