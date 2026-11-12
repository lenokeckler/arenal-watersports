import type { ExtraFormValues } from "../../models/ExtraFormValues.interface";
import type { ExtraFormViewModelProps } from "../../models/ExtraFormViewModelProps.type";

export interface ExtraFormSeedCase {
  props: ExtraFormViewModelProps;
  values: ExtraFormValues;
}
