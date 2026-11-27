"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { PATHS, STORE_SLICES } from "@/app/constants";
import {
  categoryConfigureActions,
  type AppDispatch,
  type RootState,
} from "@/app/store";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigureLeaveViewModel } from "../models/CategoryConfigureLeaveViewModel.interface";
import type { UseCategoryConfigureLeaveOptions } from "../models/UseCategoryConfigureLeaveOptions.interface";
import { resolveDirtyLabel } from "../utils/resolveDirtyLabel";
import { useUnsavedChangesGuard } from "./useUnsavedChangesGuard";

export const useCategoryConfigureLeave = ({
  name,
  changedCount,
  onSave,
}: UseCategoryConfigureLeaveOptions): CategoryConfigureLeaveViewModel => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLeavePromptOpen, saveStatus } = useSelector(
    (state: RootState) =>
      state[STORE_SLICES.CATEGORY_CONFIGURE]
  );
  const isSaving =
    saveStatus === CATEGORY_CONFIGURE_SAVE_STATUS.SAVING;
  const hasUnsavedChanges = changedCount > 0;
  useUnsavedChangesGuard(hasUnsavedChanges);

  const setPromptOpen = (isOpen: boolean): void => {
    dispatch(
      categoryConfigureActions.setIsLeavePromptOpen(isOpen)
    );
  };

  const onDiscard = (): void => {
    setPromptOpen(false);
    router.push(PATHS.ADMINISTRATION.CATEGORIES);
  };

  const onSaveAndLeave = async (): Promise<void> => {
    const isSaved = await onSave();
    setPromptOpen(false);
    if (isSaved) {
      router.push(PATHS.ADMINISTRATION.CATEGORIES);
    }
  };

  return {
    hasUnsavedChanges,
    onRequestLeave: () => setPromptOpen(true),
    sheet: isLeavePromptOpen
      ? {
          body: CATEGORY_CONFIGURE_COPY.LEAVE_BODY(
            resolveDirtyLabel(changedCount),
            name
          ),
          isSaving,
          onSaveAndLeave,
          onDiscard,
          onCancel: () => {
            if (!isSaving) {
              setPromptOpen(false);
            }
          },
        }
      : null,
  };
};
