"use client";

import { useEffect, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { CategoryImagePreview } from "../models/CategoryImagePreview.interface";

export const useCategoryImagePreviewUrl = (
  file: NullableRef<File>
): NullableRef<string> => {
  const [preview, setPreview] =
    useState<NullableRef<CategoryImagePreview>>(null);

  useEffect(() => {
    if (!file) {
      return undefined;
    }

    const url = URL.createObjectURL(file);
    let isCurrent = true;
    queueMicrotask(() => {
      if (isCurrent) {
        setPreview({ file, url });
      }
    });

    return () => {
      isCurrent = false;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return preview && preview.file === file
    ? preview.url
    : null;
};
