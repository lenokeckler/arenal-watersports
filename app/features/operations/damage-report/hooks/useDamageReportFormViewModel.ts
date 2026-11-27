"use client";

import type { DamageReportFormViewModel } from "../models/DamageReportFormViewModel.interface";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import { useDamageReportDraft } from "./useDamageReportDraft";
import { useDamageReportSubmit } from "./useDamageReportSubmit";

export const useDamageReportFormViewModel = (
  screen: DamageReportScreen
): DamageReportFormViewModel => {
  const {
    draft,
    errors,
    handlers,
    selectedUnit,
    setErrors,
  } = useDamageReportDraft(screen);
  const { errorMessage, isSubmitting, send } =
    useDamageReportSubmit({
      draft,
      onValidated: setErrors,
      screen,
    });

  return {
    ...handlers,
    draft,
    errorMessage,
    errors,
    handleSubmit: (event) => {
      event.preventDefault();
      void send(false);
    },
    handleSubmitLater: () => void send(true),
    isCompleting: screen.pending !== null,
    isSubmitting,
    selectedUnit,
  };
};
