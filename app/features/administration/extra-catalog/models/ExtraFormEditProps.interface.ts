import type { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { Extra } from "./Extra.interface";

export interface ExtraFormEditProps {
  mode: typeof EXTRA_FORM_MODE.EDIT;
  extra: Extra;
}
