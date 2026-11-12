"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { CategoryImageFormViewModel } from "../models/CategoryImageFormViewModel.interface";
import type { CategoryImageFormViewModelProps } from "../models/CategoryImageFormViewModelProps.interface";
import { resolveCategoryImageFormState } from "../utils/resolveCategoryImageFormState";
import { resolveCategoryImageIssueMessage } from "../utils/resolveCategoryImageIssueMessage";
import { validateCategoryImagePick } from "../utils/validateCategoryImagePick";
import { useCategoryImagePreviewUrl } from "./useCategoryImagePreviewUrl";
import { useCategoryImageRemoval } from "./useCategoryImageRemoval";
import { useCategoryImageUpload } from "./useCategoryImageUpload";

export const useCategoryImageFormViewModel = ({
  image,
}: CategoryImageFormViewModelProps): CategoryImageFormViewModel => {
  const router = useRouter();
  const [pickedFile, setPickedFile] =
    useState<NullableRef<File>>(null);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const pickedPreviewUrl =
    useCategoryImagePreviewUrl(pickedFile);

  const refreshImage = (): void => {
    setPickedFile(null);
    router.refresh();
  };

  const { isSubmitting: isUploading, upload } =
    useCategoryImageUpload({ onSaved: refreshImage });
  const removal = useCategoryImageRemoval({
    categoryId: image.categoryId,
    onRemoved: refreshImage,
  });

  const onPickFile = (file: File): void => {
    const issue = validateCategoryImagePick(file);
    setPickedFile(issue ? null : file);
    setErrorMessage(
      issue ? resolveCategoryImageIssueMessage(issue) : null
    );
  };

  const onSave = async (): Promise<void> => {
    if (pickedFile) {
      await upload(image.categoryId, pickedFile);
    }
  };

  const onBack = (): void => {
    router.push(PATHS.ADMINISTRATION.CATEGORIES);
  };

  return {
    errorMessage,
    formState: resolveCategoryImageFormState({
      hasPickedFile: pickedFile !== null,
      imageUrl: image.imageUrl,
    }),
    isConfirmingRemoval: removal.isConfirmingRemoval,
    isSubmitting: isUploading || removal.isRemoving,
    onBack,
    onCancelRemoval: removal.cancelRemoval,
    onConfirmRemoval: removal.confirmRemoval,
    onPickFile,
    onRequestRemoval: removal.requestRemoval,
    onSave,
    previewUrl: pickedPreviewUrl ?? image.imageUrl,
  };
};
