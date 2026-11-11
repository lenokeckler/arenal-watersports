import type { Extra } from "../models/Extra.interface";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";

export const mapExtraToFormValues = ({
  name,
}: Extra): ExtraFormValues => ({ name });
