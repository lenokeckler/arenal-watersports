"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { Nullable } from "@/app/types";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardRemovalViewModel } from "../models/ExtraCardRemovalViewModel.interface";
import type { ExtraPendingIdSetter } from "../models/ExtraPendingIdSetter.type";
import { deleteOrDeactivateExtraAction } from "../services/deleteOrDeactivateExtraAction";
import { buildRemovalCardResult } from "../utils/buildRemovalCardResult";
import { clearExtraIdWhenCurrent } from "../utils/clearExtraIdWhenCurrent";
import { runExtraCardMutation } from "../utils/runExtraCardMutation";

export const useExtraCardRemoval = (
  setPendingExtraId: ExtraPendingIdSetter
): ExtraCardRemovalViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const [confirmingExtraId, setConfirmingExtraId] =
    useState<Nullable<string>>(null);

  const onRemoveClick = (extraId: string) => (): void =>
    setConfirmingExtraId(extraId);

  const onCancelClick = (): void =>
    setConfirmingExtraId(null);

  const onConfirmRemovalClick =
    (extraId: string) => (): Promise<void> =>
      runExtraCardMutation({
        extraId,
        genericErrorMessage:
          EXTRA_CATALOG_COPY.REMOVAL_GENERIC_ERROR,
        mutate: async (targetExtraId) =>
          buildRemovalCardResult(
            await deleteOrDeactivateExtraAction(
              targetExtraId
            )
          ),
        onSettled: () => {
          setConfirmingExtraId(
            clearExtraIdWhenCurrent(extraId)
          );
          router.refresh();
        },
        setPendingExtraId,
        showToast,
      });

  return {
    confirmingExtraId,
    onCancelClick,
    onConfirmRemovalClick,
    onRemoveClick,
  };
};
