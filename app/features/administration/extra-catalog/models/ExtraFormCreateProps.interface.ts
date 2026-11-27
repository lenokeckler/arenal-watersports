import type { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import type { ExtraFormOccupancyProps } from "./ExtraFormOccupancyProps.interface";

export interface ExtraFormCreateProps extends ExtraFormOccupancyProps {
  mode: typeof EXTRA_FORM_MODE.CREATE;
}
