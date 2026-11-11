"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STRING } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { NullableUndefined } from "@/app/types";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { UnitDecommissionPanelProps } from "../models/UnitDecommissionPanelProps.interface";
import type { UnitDecommissionViewModel } from "../models/UnitDecommissionViewModel.interface";
import type { UnitFormFieldChangeEvent } from "../models/UnitFormFieldChangeEvent.type";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import { submitUnitDecommission } from "../utils/submitUnitDecommission";
import { validateUnitDecommissionReason } from "../utils/validateUnitDecommissionReason";

export const useUnitDecommission = ({
  categoryId,
  unitId,
}: UnitDecommissionPanelProps): UnitDecommissionViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [isConfirming, setIsConfirming] = useState(false);
  const [reason, setReason] = useState<string>(
    STRING.Empty
  );
  const [error, setError] =
    useState<NullableUndefined<string>>(undefined);

  const onStartClick = (): void => {
    setIsConfirming(true);
  };

  const onCancelClick = (): void => {
    setIsConfirming(false);
    setReason(STRING.Empty);
    setError(undefined);
  };

  const onReasonChange = (
    event: UnitFormFieldChangeEvent
  ): void => {
    setReason(event.target.value);
    setError(undefined);
  };

  const onDecommissioned = (): void => {
    router.push(resolveCategoryUnitsPath(categoryId));
  };

  const onConfirmClick = async (): Promise<void> => {
    const reasonError =
      validateUnitDecommissionReason(reason);
    if (reasonError) {
      setError(reasonError);
      return;
    }

    await runLocked(() =>
      submitUnitDecommission({
        input: { unitId, reason },
        showToast,
        onDecommissioned,
      })
    );
  };

  return {
    error,
    isConfirming,
    isSubmitting,
    reason,
    onCancelClick,
    onConfirmClick,
    onReasonChange,
    onStartClick,
  };
};
