"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { PATHS, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { submitMaintenanceJob } from "../actions/submitMaintenanceJob";
import {
  MAINTENANCE_JOB_STATUS,
  MAINTENANCE_JOB_WORK_TYPE,
} from "../constants/MaintenanceJob.constants";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobDraft } from "../models/MaintenanceJobDraft.interface";
import type { MaintenanceJobForm } from "../models/MaintenanceJobForm.interface";
import type { MaintenanceJobErrors } from "../models/MaintenanceJobFormResult.interface";
import type { MaintenanceJobFormInput } from "../models/MaintenanceJobFormInput.interface";
import { buildMaintenanceJobForm } from "../utils/buildMaintenanceJobForm";
import { getCostaRicaToday } from "../utils/getCostaRicaToday";

const NO_ERRORS: MaintenanceJobErrors = {
  cost: null,
  currency: null,
  date: null,
  description: null,
  threshold: null,
  unit: null,
  workType: null,
};

export const useMaintenanceJobForm = ({
  units,
}: MaintenanceJobFormInput): MaintenanceJobForm => {
  const router = useRouter();
  const [draft, setDraft] = useState<MaintenanceJobDraft>(
    () => ({
      costAmount: STRING.Empty,
      costCurrency: STRING.Empty,
      description: STRING.Empty,
      isExternal: false,
      nextOilChangeAt: STRING.Empty,
      performedAt: getCostaRicaToday(new Date()),
      unitId: STRING.Empty,
      workType: STRING.Empty,
    })
  );
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);

  const result = buildMaintenanceJobForm(
    draft,
    units,
    getCostaRicaToday(new Date())
  );

  const handleChange =
    (field: keyof MaintenanceJobDraft) =>
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

  const handleExternalToggle = (): void => {
    setDraft((current) => ({
      ...current,
      isExternal: !current.isExternal,
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
      const { status } = await submitMaintenanceJob(
        result.input
      );

      if (status === MAINTENANCE_JOB_STATUS.REGISTERED) {
        router.push(PATHS.OPERATIONS.MAINTENANCE);
      } else if (
        status === MAINTENANCE_JOB_STATUS.UNIT_RETIRED
      ) {
        setErrorMessage(MAINTENANCE_JOB_COPY.ERROR_RETIRED);
      } else {
        setErrorMessage(MAINTENANCE_JOB_COPY.ERROR_INVALID);
      }
    } catch {
      setErrorMessage(MAINTENANCE_JOB_COPY.ERROR_GENERIC);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    draft,
    errorMessage,
    errors: showErrors ? result.errors : NO_ERRORS,
    handleChange,
    handleExternalToggle,
    handleSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void submit();
    },
    isOilChange:
      draft.workType ===
      MAINTENANCE_JOB_WORK_TYPE.OIL_CHANGE,
    isSubmitting,
    selectedUnit:
      units.find((unit) => unit.unitId === draft.unitId) ??
      null,
  };
};
