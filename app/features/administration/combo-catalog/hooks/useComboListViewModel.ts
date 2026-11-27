"use client";

import { useRouter } from "next/navigation";
import type { ComboListViewModel } from "../models/ComboListViewModel.interface";
import type { ComboListViewModelProps } from "../models/ComboListViewModelProps.interface";
import { buildComboSections } from "../utils/buildComboSections";
import { useComboActions } from "./useComboActions";

export const useComboListViewModel = ({
  combos,
}: ComboListViewModelProps): ComboListViewModel => {
  const router = useRouter();
  const actions = useComboActions();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    onRetry,
    removalSheet: actions.comboPendingRemoval
      ? {
          onCancelClick: actions.onCancelRemovalClick,
          onConfirmClick: actions.onConfirmRemovalClick,
        }
      : null,
    sections: buildComboSections(combos, actions),
  };
};
