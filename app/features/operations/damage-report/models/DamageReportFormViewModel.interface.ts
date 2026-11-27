import type { ChangeEvent, FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { DamageReportDraft } from "./DamageReportDraft.interface";
import type { DamageReportErrors } from "./DamageReportErrors.interface";
import type { DamageReportUnit } from "./DamageReportUnit.interface";

export interface DamageReportFormViewModel {
  draft: DamageReportDraft;
  errorMessage: NullableRef<string>;
  errors: DamageReportErrors;
  handleCauseChange: (value: string) => void;
  handleDescriptionChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  handleHitsChange: (value: number) => void;
  handleStateChange: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleSubmitLater: () => void;
  handleTripChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  handleUnitChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  isCompleting: boolean;
  isSubmitting: boolean;
  selectedUnit: NullableRef<DamageReportUnit>;
}
