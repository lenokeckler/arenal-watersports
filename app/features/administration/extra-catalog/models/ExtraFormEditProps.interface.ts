import type { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraDetail } from "./ExtraDetail.interface";

export interface ExtraFormEditProps {
  mode: typeof EXTRA_FORM_MODE.EDIT;
  extra: ExtraDetail;
}
