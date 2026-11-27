import type { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraDetail } from "./ExtraDetail.interface";
import type { ExtraFormOccupancyProps } from "./ExtraFormOccupancyProps.interface";

export interface ExtraFormEditProps extends ExtraFormOccupancyProps {
  mode: typeof EXTRA_FORM_MODE.EDIT;
  extra: ExtraDetail;
}
