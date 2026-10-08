import { useState } from "react";
import type { DamageReportFieldChangeHandler } from "../models/DamageReportFieldChangeHandler.type";
import type { DamageReportFormValues } from "../models/DamageReportFormValues.interface";

const INITIAL_DAMAGE_REPORT_VALUES: DamageReportFormValues =
  {
    unitId: "",
    cause: null,
    description: "",
    impactDelta: 0,
  };

export const useDamageReportFormValues = () => {
  const [values, setValues] =
    useState<DamageReportFormValues>(
      INITIAL_DAMAGE_REPORT_VALUES
    );

  const createChangeHandler =
    (
      field: keyof DamageReportFormValues
    ): DamageReportFieldChangeHandler =>
    (event) => {
      const { value } = event.target;

      setValues((current) => ({
        ...current,
        [field]:
          field === "impactDelta" ? Number(value) : value,
      }));
    };

  const resetValues = () => {
    setValues(INITIAL_DAMAGE_REPORT_VALUES);
  };

  return {
    handleCauseChange: createChangeHandler("cause"),
    handleDescriptionChange:
      createChangeHandler("description"),
    handleImpactDeltaChange:
      createChangeHandler("impactDelta"),
    handleUnitChange: createChangeHandler("unitId"),
    resetValues,
    values,
  };
};
