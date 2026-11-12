import type { ChangeEvent, FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { UnitCorrectionDraft } from "./UnitCorrectionDraft.interface";
import type { UnitCorrectionErrors } from "./UnitCorrectionFormResult.interface";

export interface UnitCorrectionForm {
  draft: UnitCorrectionDraft;
  errorMessage: NullableRef<string>;
  errors: UnitCorrectionErrors;
  gaugeLevel: NullableRef<number>;
  gaugeMax: number;
  handleChange: (
    field: keyof UnitCorrectionDraft
  ) => (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  handleSelectLevel: (level: number) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}
