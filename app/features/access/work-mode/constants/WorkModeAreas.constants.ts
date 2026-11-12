import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";

export const WORK_MODE_AREA_ORDER: readonly WorkArea[] = [
  SUPABASE_WORK_AREA.OPERATIONS,
  SUPABASE_WORK_AREA.RESERVATIONS,
  SUPABASE_WORK_AREA.ADMINISTRATION,
];

export const WORK_MODE_AREA_ICON: Record<
  WorkArea,
  MaterialIconName
> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]:
    MATERIAL_ICON_NAME.ADMIN_PANEL_SETTINGS,
  [SUPABASE_WORK_AREA.OPERATIONS]:
    MATERIAL_ICON_NAME.SAILING,
  [SUPABASE_WORK_AREA.RESERVATIONS]:
    MATERIAL_ICON_NAME.EVENT,
};
