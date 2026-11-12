import type { ChangeEvent, FormEvent } from "react";
import type { NullableRef } from "@/app/types";
import type { MaintenanceJobDraft } from "./MaintenanceJobDraft.interface";
import type { MaintenanceJobErrors } from "./MaintenanceJobFormResult.interface";
import type { MaintenanceJobUnit } from "./MaintenanceJobUnit.interface";

export interface MaintenanceJobForm {
  draft: MaintenanceJobDraft;
  errorMessage: NullableRef<string>;
  errors: MaintenanceJobErrors;
  handleChange: (
    field: keyof MaintenanceJobDraft
  ) => (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  handleExternalToggle: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isOilChange: boolean;
  isSubmitting: boolean;
  selectedUnit: NullableRef<MaintenanceJobUnit>;
}
