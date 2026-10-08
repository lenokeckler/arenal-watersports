"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { submitDamageReport } from "../actions/submitDamageReport";
import type { DamageReportFormViewModel } from "../models/DamageReportFormViewModel.interface";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";
import { useDamageReportFormValues } from "./useDamageReportFormValues";

export const useDamageReportFormViewModel = (
  units: DamageReportUnit[]
): DamageReportFormViewModel => {
  const form = useDamageReportFormValues();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<
    string | null
  >(null);
  const [submissionSuccess, setSubmissionSuccess] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { cause } = form.values;

    if (!cause) {
      setSubmissionError("Debe seleccionar una causa.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const result = await submitDamageReport({
      ...form.values,
      cause,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmissionError(result.error);
      return;
    }

    form.resetValues();
    setSubmissionSuccess(true);
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
