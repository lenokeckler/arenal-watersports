import type { UnitFormErrors } from "../../models/UnitFormErrors.interface";
import type { UnitFormRules } from "../../models/UnitFormRules.interface";
import type { UnitFormValues } from "../../models/UnitFormValues.interface";

export interface UnitFormRuleCase {
  description: string;
  overrides: Partial<UnitFormValues>;
  rules?: UnitFormRules;
  expectedErrors: UnitFormErrors;
}
