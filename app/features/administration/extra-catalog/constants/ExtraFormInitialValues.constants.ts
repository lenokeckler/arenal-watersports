import { STRING } from "@/app/constants";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";

export const EXTRA_FORM_INITIAL_VALUES: ExtraFormValues = {
  name: STRING.Empty,
  priceUsd: STRING.Empty,
  priceCrc: STRING.Empty,
};
