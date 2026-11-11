"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { PATHS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitUnitCorrection } from "../actions/submitUnitCorrection";
import { UNIT_CORRECTION_COPY } from "../constants/UnitCorrectionCopy.constants";
import {
  UNIT_READINGS_LIMITS,
  UNIT_READINGS_RESULT,
} from "../constants/UnitReadings.constants";
import type { UnitCorrectionDraft } from "../models/UnitCorrectionDraft.interface";
import type { UnitCorrectionForm } from "../models/UnitCorrectionForm.interface";
import type { UnitCorrectionFormProps } from "../models/UnitCorrectionFormProps.interface";
import type { UnitCorrectionErrors } from "../models/UnitCorrectionFormResult.interface";
import { buildUnitCorrectionForm } from "../utils/buildUnitCorrectionForm";
import { parseWholeNumber } from "../utils/parseUnitCorrectionNumber";

const NO_ERRORS: UnitCorrectionErrors = {
  fuelLevel: null,
  fuelMax: null,
  impactCount: null,
  usageTotal: null,
};

const RESULT_MESSAGE: Record<string, string> = {
  [UNIT_READINGS_RESULT.INVALID]:
    UNIT_CORRECTION_COPY.ERROR_INVALID,
  [UNIT_READINGS_RESULT.NOT_CORRECTABLE]:
    UNIT_CORRECTION_COPY.ERROR_NOT_CORRECTABLE,
  [UNIT_READINGS_RESULT.UNCHANGED]:
    UNIT_CORRECTION_COPY.ERROR_UNCHANGED,
};

export const useUnitCorrectionForm = ({
  unit,
}: UnitCorrectionFormProps): UnitCorrectionForm => {
  const router = useRouter();
  const [draft, setDraft] = useState<UnitCorrectionDraft>(
    () => ({
      fuelLevel: String(unit.fuelLevel ?? 0),
      fuelMax: String(unit.fuelMax),
      impactCount: String(unit.impactCount),
      status: unit.status,
      usageTotal: String(unit.usageTotal),
    })
  );
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const result = buildUnitCorrectionForm(draft, unit.id);
  const gaugeMax =
    parseWholeNumber(
      draft.fuelMax,
      UNIT_READINGS_LIMITS.FUEL_MAX_MAX
    ) || unit.fuelMax;

  const handleChange =
    (field: keyof UnitCorrectionDraft) =>
    (
      event: ChangeEvent<
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
      >
    ): void => {
      setErrorMessage(null);
      setDraft((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const submit = async (): Promise<void> => {
    setShowErrors(true);

    if (result.input === null || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { status } = await submitUnitCorrection(
        result.input
      );

      if (status === UNIT_READINGS_RESULT.CORRECTED) {
        router.push(PATHS.OPERATIONS.UNIT_READINGS);
      } else {
        setErrorMessage(
          RESULT_MESSAGE[status] ??
            UNIT_CORRECTION_COPY.ERROR_GENERIC
        );
      }
    } catch {
      setErrorMessage(UNIT_CORRECTION_COPY.ERROR_GENERIC);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    draft,
    errorMessage,
    errors: showErrors ? result.errors : NO_ERRORS,
    gaugeLevel: parseWholeNumber(draft.fuelLevel, gaugeMax),
    gaugeMax,
    handleChange,
    handleSelectLevel: (level: number): void => {
      setErrorMessage(null);
      setDraft((current) => ({
        ...current,
        fuelLevel: String(level),
      }));
    },
    handleSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void submit();
    },
    isSubmitting,
  };
};
