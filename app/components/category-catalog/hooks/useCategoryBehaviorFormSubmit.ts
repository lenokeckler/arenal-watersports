"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryBehaviorFormSubmitOptions } from "../models/CategoryBehaviorFormSubmitOptions.interface";
import type { CategoryBehaviorFormSubmitViewModel } from "../models/CategoryBehaviorFormSubmitViewModel.interface";
import { submitCategoryBehavior } from "../utils/submitCategoryBehavior";
import { validateCategoryBehaviorFormValues } from "../utils/validateCategoryBehaviorFormValues";

export const useCategoryBehaviorFormSubmit = ({
  categoryId,
  values,
  onValidationErrors,
}: CategoryBehaviorFormSubmitOptions): CategoryBehaviorFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const onSubmit = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const validationErrors =
      validateCategoryBehaviorFormValues(values);
    if (Object.keys(validationErrors).length > 0) {
      onValidationErrors(validationErrors);
      return;
    }

    onValidationErrors({});
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      await submitCategoryBehavior({
        categoryId,
        values,
        showToast,
        onSaved: () =>
          router.push(PATHS.ADMINISTRATION.CATEGORIES),
      });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
};
