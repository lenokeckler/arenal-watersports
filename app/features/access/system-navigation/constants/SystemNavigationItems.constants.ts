import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import type { SystemNavigationItem } from "../models/SystemNavigationItem.interface";
import { SYSTEM_NAVIGATION_COPY } from "./SystemNavigationCopy.constants";

export const buildSystemNavigationItems = (
  area: WorkArea
): readonly SystemNavigationItem[] => [
  {
    label: SYSTEM_NAVIGATION_COPY.BOARD,
    href: PATHS.BOARD,
    icon: MATERIAL_ICON_NAME.DASHBOARD,
    disabled: false,
  },
  {
    label: SYSTEM_NAVIGATION_COPY.CALENDAR,
    href:
      area === SUPABASE_WORK_AREA.OPERATIONS
        ? PATHS.OPERATIONS.CALENDAR
        : PATHS.RESERVATIONS.CALENDAR,
    icon: MATERIAL_ICON_NAME.EVENT,
    disabled: false,
  },
  {
    label:
      area === SUPABASE_WORK_AREA.RESERVATIONS
        ? SYSTEM_NAVIGATION_COPY.INCOME
        : SYSTEM_NAVIGATION_COPY.INVENTORY,
    href:
      area === SUPABASE_WORK_AREA.RESERVATIONS
        ? PATHS.RESERVATIONS.INCOME
        : null,
    icon:
      area === SUPABASE_WORK_AREA.RESERVATIONS
        ? MATERIAL_ICON_NAME.PAYMENTS
        : MATERIAL_ICON_NAME.DIRECTIONS_BOAT,
    disabled: area !== SUPABASE_WORK_AREA.RESERVATIONS,
  },
  {
    label: SYSTEM_NAVIGATION_COPY.HISTORY,
    href: null,
    icon: MATERIAL_ICON_NAME.HISTORY,
    disabled: true,
  },
];
