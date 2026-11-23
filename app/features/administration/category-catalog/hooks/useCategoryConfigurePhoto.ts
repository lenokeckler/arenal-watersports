"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { CategoryConfigurePhotoProps } from "../models/CategoryConfigurePhotoProps.interface";
import type { CategoryImage } from "../models/CategoryImage.interface";
import { resolveCategoryImageFormState } from "../utils/resolveCategoryImageFormState";
import { resolveCategoryImageIssueMessage } from "../utils/resolveCategoryImageIssueMessage";
import { validateCategoryImagePick } from "../utils/validateCategoryImagePick";
import { useCategoryImagePreviewUrl } from "./useCategoryImagePreviewUrl";

export const useCategoryConfigurePhoto = (
  image: CategoryImage
): CategoryConfigurePhotoProps => {
  const [pickedFile, setPickedFile] =
    useState<NullableRef<File>>(null);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const pickedPreviewUrl =
    useCategoryImagePreviewUrl(pickedFile);

  const onPickFile = (file: File): void => {
    const issue = validateCategoryImagePick(file);
    setPickedFile(issue ? pickedFile : file);
    setErrorMessage(
      issue ? resolveCategoryImageIssueMessage(issue) : null
    );
  };

  return {
    errorMessage,
    formState: resolveCategoryImageFormState({
      hasPickedFile: pickedFile !== null,
      imageUrl: image.imageUrl,
    }),
    previewUrl: pickedPreviewUrl ?? image.imageUrl,
    onPickFile,
  };
};
