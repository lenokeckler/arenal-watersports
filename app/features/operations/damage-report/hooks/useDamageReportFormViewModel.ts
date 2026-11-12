"use client";

import type { NullableRef } from "@/app/types";
import { useState } from "react";
import type { FormEvent } from "react";
import { submitDamageReport } from "../actions/submitDamageReport";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportFormViewModel } from "../models/DamageReportFormViewModel.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";
import { useDamageReportFormValues } from "./useDamageReportFormValues";

export const useDamageReportFormViewModel = (
  units: DamageReportUnit[]
): DamageReportFormViewModel => {
  const form = useDamageReportFormValues();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] =
    useState<NullableRef<string>>(null);
  const [submissionSuccess, setSubmissionSuccess] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { cause } = form.values;

    if (!cause) {
      setSubmissionError(
        DAMAGE_REPORT_COPY.CAUSE_REQUIRED_ERROR
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      await submitDamageReport({
        ...form.values,
        cause,
      });

      form.resetValues();
      setSubmissionSuccess(true);
    } catch {
      setSubmissionError(DAMAGE_REPORT_COPY.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleCauseChange: form.handleCauseChange,
    handleDescriptionChange: form.handleDescriptionChange,
    handleImpactDeltaChange: form.handleImpactDeltaChange,
    handleUnitChange: form.handleUnitChange,
    handleSubmit,
    isSubmitting,
    submissionError,
    submissionSuccess,
    units,
    values: form.values,
  };
};
