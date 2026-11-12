"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardReactivationViewModel } from "../models/ExtraCardReactivationViewModel.interface";
import type { ExtraPendingIdSetter } from "../models/ExtraPendingIdSetter.type";
import { reactivateExtraAction } from "../services/reactivateExtraAction";
import { buildReactivationCardResult } from "../utils/buildReactivationCardResult";
import { runExtraCardMutation } from "../utils/runExtraCardMutation";

export const useExtraCardReactivation = (
  setPendingExtraId: ExtraPendingIdSetter
): ExtraCardReactivationViewModel => {
  const router = useRouter();
  const { showToast } = useToast();

  const onReactivateClick =
    (extraId: string) => (): Promise<void> =>
      runExtraCardMutation({
        extraId,
        genericErrorMessage:
          EXTRA_CATALOG_COPY.REACTIVATE_GENERIC_ERROR,
        mutate: async (targetExtraId) =>
          buildReactivationCardResult(
            await reactivateExtraAction(targetExtraId)
          ),
        onSettled: () => router.refresh(),
        setPendingExtraId,
        showToast,
      });

  return { onReactivateClick };
};
