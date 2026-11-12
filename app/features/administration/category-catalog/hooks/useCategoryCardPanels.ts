"use client";

import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { CategoryCardPanelsViewModel } from "../models/CategoryCardPanelsViewModel.interface";
import { resolveOpenCategoryAfterToggle } from "../utils/resolveOpenCategoryAfterToggle";

export const useCategoryCardPanels =
  (): CategoryCardPanelsViewModel => {
    const [openCategoryId, setOpenCategoryId] =
      useState<NullableRef<string>>(null);

    const onTogglePanelClick =
      (categoryId: string) => (): void =>
        setOpenCategoryId((current) =>
          resolveOpenCategoryAfterToggle(
            current,
            categoryId
          )
        );

    return { onTogglePanelClick, openCategoryId };
  };
