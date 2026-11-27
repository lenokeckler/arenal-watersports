import type { ComboAudience } from "../models/ComboAudience.type";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";
import { COMBO_FORM_COPY } from "./ComboFormCopy.constants";

export const COMBO_AUDIENCE_OPTION_LABEL: Record<
  ComboAudience,
  string
> = {
  [COMBO_AUDIENCE.FOREIGN]:
    COMBO_FORM_COPY.AUDIENCE_FOREIGN_OPTION,
  [COMBO_AUDIENCE.NATIONAL]:
    COMBO_FORM_COPY.AUDIENCE_NATIONAL_OPTION,
};
