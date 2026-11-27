"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DamageReportSubmitRequest } from "../models/DamageReportSubmitRequest.interface";
import type { DamageReportSubmitState } from "../models/DamageReportSubmitState.interface";
import type { DamageSubmitStatus } from "../models/DamageSubmitStatus.interface";
import { buildDamageReportInput } from "../utils/buildDamageReportInput";
import { buildSavedReportPath } from "../utils/buildSavedReportPath";
import { requestDamageReport } from "../utils/requestDamageReport";
import { validateDamageReport } from "../utils/validateDamageReport";

export const useDamageReportSubmit = ({
  draft,
  onValidated,
  screen,
}: DamageReportSubmitRequest): DamageReportSubmitState => {
  const router = useRouter();
  const [status, setStatus] = useState<DamageSubmitStatus>({
    errorMessage: null,
    isSubmitting: false,
  });

  const send = async (later: boolean): Promise<void> => {
    const found = validateDamageReport(draft, later);
    onValidated(found);
    const isBlocked = Object.values(found).some(Boolean);

    if (isBlocked || status.isSubmitting) {
      return;
    }

    setStatus({ errorMessage: null, isSubmitting: true });
    const reportId = screen.pending?.id ?? null;
    const failure = await requestDamageReport(
      buildDamageReportInput(draft, reportId, later)
    );

    if (failure) {
      setStatus({
        errorMessage: failure,
        isSubmitting: false,
      });
      return;
    }

    router.replace(buildSavedReportPath(later));
  };

  return { ...status, send };
};
