import type { FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { DamageReportFieldChangeHandler } from "./DamageReportFieldChangeHandler.type";
import type { DamageReportFormValues } from "./DamageReportFormValues.interface";
import type { DamageReportUnit } from "./DamageReportUnit.interface";

export interface DamageReportFormViewModel {
  handleCauseChange: DamageReportFieldChangeHandler;
  handleDescriptionChange: DamageReportFieldChangeHandler;
  handleImpactDeltaChange: DamageReportFieldChangeHandler;
  handleUnitChange: DamageReportFieldChangeHandler;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submissionError: NullableRef<string>;
  submissionSuccess: boolean;
  units: DamageReportUnit[];
  values: DamageReportFormValues;
}
