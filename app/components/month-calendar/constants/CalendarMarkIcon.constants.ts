import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { CALENDAR_MARK } from "./CalendarMark.constants";

export const CALENDAR_MARK_ICON = {
  [CALENDAR_MARK.DAMAGE]: MATERIAL_ICON_NAME.WARNING,
  [CALENDAR_MARK.JOB]: MATERIAL_ICON_NAME.BUILD,
} as const;
