"use client";

import { useRef, useState } from "react";
import {
  unstable_rethrow,
  useRouter,
} from "next/navigation";
import { PATHS, STATUS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryBehaviorFormSubmitOptions } from "../models/CategoryBehaviorFormSubmitOptions.interface";
import type { CategoryBehaviorFormSubmitViewModel } from "../models/CategoryBehaviorFormSubmitViewModel.interface";
import { updateCategoryBehaviorAction } from "../services/updateCategoryBehaviorAction";
import { mapCategoryBehaviorFormValuesToInput } from "../utils/mapCategoryBehaviorFormValuesToInput";
import { resolveUpdateCategoryBehaviorFeedback } from "../utils/resolveUpdateCategoryBehaviorFeedback";
import { showGenericMutationErrorToast } from "../utils/showGenericMutationErrorToast";
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
      const result = await updateCategoryBehaviorAction(
        mapCategoryBehaviorFormValuesToInput(
          categoryId,
          values
        )
      );
      const feedback =
        resolveUpdateCategoryBehaviorFeedback(result);
      showToast(feedback.status, feedback.message);

      if (feedback.status === STATUS.SUCCESS) {
        router.push(PATHS.ADMINISTRATION.CATEGORIES);
      }
    } catch (error) {
      unstable_rethrow(error);
      showGenericMutationErrorToast(showToast);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
};
