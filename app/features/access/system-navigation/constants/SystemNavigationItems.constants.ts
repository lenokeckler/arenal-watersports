import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "./SystemNavigationCopy.constants";

export const SYSTEM_NAVIGATION_ITEMS = {
  BOARD: {
    label: SYSTEM_NAVIGATION_COPY.BOARD,
    href: PATHS.BOARD,
    icon: MATERIAL_ICON_NAME.DASHBOARD,
  },
  HISTORY: {
    label: SYSTEM_NAVIGATION_COPY.HISTORY,
    href: PATHS.HISTORY.ROOT,
    icon: MATERIAL_ICON_NAME.HISTORY,
  },
} as const;

export const SYSTEM_NAVIGATION_CALENDAR_ITEM = {
  label: SYSTEM_NAVIGATION_COPY.CALENDAR,
  icon: MATERIAL_ICON_NAME.EVENT,
} as const;

export const SYSTEM_NAVIGATION_INVENTORY_ITEM = {
  label: SYSTEM_NAVIGATION_COPY.INVENTORY,
  href: PATHS.OPERATIONS.INVENTORY,
  icon: MATERIAL_ICON_NAME.DIRECTIONS_BOAT,
} as const;
