"use client";

import { useState } from "react";
import type { DamageDraftUpdate } from "../models/DamageDraftUpdate.type";
import type { DamageReportDraft } from "../models/DamageReportDraft.interface";
import type { DamageReportDraftState } from "../models/DamageReportDraftState.interface";
import type { DamageReportErrors } from "../models/DamageReportErrors.interface";
import type { DamageReportScreen } from "../models/DamageReportScreen.interface";
import { buildDraftHandlers } from "../utils/buildDraftHandlers";
import { resolveInitialDraft } from "../utils/resolveInitialDraft";

const NO_ERRORS: DamageReportErrors = {
  cause: null,
  description: null,
  unit: null,
};

export const useDamageReportDraft = (
  screen: DamageReportScreen
): DamageReportDraftState => {
  const [draft, setDraft] = useState<DamageReportDraft>(
    () => resolveInitialDraft(screen)
  );
  const [errors, setErrors] =
    useState<DamageReportErrors>(NO_ERRORS);
  const update: DamageDraftUpdate = (changes) =>
    setDraft((current) => ({ ...current, ...changes }));

  return {
    draft,
    errors,
    handlers: buildDraftHandlers(update, screen.units),
    selectedUnit:
      screen.units.find(
        (unit) => unit.id === draft.unitId
      ) ?? null,
    setErrors,
  };
};
