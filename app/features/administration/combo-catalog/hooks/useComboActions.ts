"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { NullableRef } from "@/app/types";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { Combo } from "../models/Combo.interface";
import type { ComboActionsViewModel } from "../models/ComboActionsViewModel.interface";
import type { RunComboActionOptions } from "../models/RunComboActionOptions.interface";
import { deleteOrDeactivateComboAction } from "../services/deleteOrDeactivateComboAction";
import { reactivateComboAction } from "../services/reactivateComboAction";
import { runComboAction } from "../utils/runComboAction";

export const useComboActions =
  (): ComboActionsViewModel => {
    const router = useRouter();
    const { showToast } = useToast();
    const [comboPendingRemoval, setComboPendingRemoval] =
      useState<NullableRef<Combo>>(null);
    const [pendingComboId, setPendingComboId] =
      useState<NullableRef<string>>(null);

    const runWithFeedback = async (
      options: RunComboActionOptions
    ): Promise<void> => {
      setPendingComboId(options.comboId);
      const result = await runComboAction(options);
      showToast(result.status, result.message);
      setPendingComboId(null);
      router.refresh();
    };

    const onRemoveClick = (combo: Combo) => (): void =>
      setComboPendingRemoval(combo);

    const onCancelRemovalClick = (): void =>
      setComboPendingRemoval(null);

    const onConfirmRemovalClick =
      async (): Promise<void> => {
        if (!comboPendingRemoval) {
          return;
        }
        const comboId = comboPendingRemoval.id;
        setComboPendingRemoval(null);
        await runWithFeedback({
          action: deleteOrDeactivateComboAction,
          comboId,
          genericErrorMessage:
            COMBO_CATALOG_COPY.REMOVAL_GENERIC_ERROR,
        });
      };

    const onReactivateClick =
      (comboId: string) => (): Promise<void> =>
        runWithFeedback({
          action: reactivateComboAction,
          comboId,
          genericErrorMessage:
            COMBO_CATALOG_COPY.REACTIVATE_GENERIC_ERROR,
        });

    return {
      comboPendingRemoval,
      onCancelRemovalClick,
      onConfirmRemovalClick,
      onReactivateClick,
      onRemoveClick,
      pendingComboId,
    };
  };
