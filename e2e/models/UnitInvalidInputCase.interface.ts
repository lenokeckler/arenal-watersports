import type { UnitFormFieldId } from "@/app/features/administration/unit-catalog/constants/UnitFormFieldId.constants";
import type { UnitFormInput } from "./UnitFormInput.interface";

export interface UnitInvalidInputCase {
  errorText: string;
  fieldId: UnitFormFieldId;
  input: Partial<UnitFormInput>;
  scenario: string;
}
