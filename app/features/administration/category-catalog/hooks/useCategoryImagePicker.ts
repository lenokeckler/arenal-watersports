"use client";

import { useRef } from "react";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { CategoryImageFileChangeEvent } from "../models/CategoryImageFileChangeEvent.type";
import type { CategoryImagePickerOptions } from "../models/CategoryImagePickerOptions.interface";
import type { CategoryImagePickerViewModel } from "../models/CategoryImagePickerViewModel.interface";

export const useCategoryImagePicker = ({
  onPickFile,
}: CategoryImagePickerOptions): CategoryImagePickerViewModel => {
  const inputRef =
    useRef<NullableRef<HTMLInputElement>>(null);

  const onOpen = (): void => {
    inputRef.current?.click();
  };

  const onChange = (
    event: CategoryImageFileChangeEvent
  ): void => {
    const [file] = Array.from(event.target.files ?? []);

    if (file) {
      onPickFile(file);
    }

    event.target.value = STRING.Empty;
  };

  return { inputRef, onChange, onOpen };
};
