"use client";

import { useState } from "react";
import type { Nullable } from "@/app/types";
import type { CategoryCardActionsViewModel } from "../models/CategoryCardActionsViewModel.interface";
import { useCategoryCardDeleteActions } from "./useCategoryCardDeleteActions";
import { useCategoryCardStatusActions } from "./useCategoryCardStatusActions";

export const useCategoryCardActions =
  (): CategoryCardActionsViewModel => {
    const [pendingCategoryId, setPendingCategoryId] =
      useState<Nullable<string>>(null);
    const deleteActions = useCategoryCardDeleteActions(
      setPendingCategoryId
    );
    const statusActions = useCategoryCardStatusActions(
      setPendingCategoryId
    );

    return {
      pendingCategoryId,
      ...deleteActions,
      ...statusActions,
    };
  };
