import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import type { SystemNavigationItem } from "../models/SystemNavigationItem.interface";
import { SYSTEM_NAVIGATION_COPY } from "./SystemNavigationCopy.constants";

export const buildSystemNavigationItems = (
  area: WorkArea
): readonly SystemNavigationItem[] => {
  const calendarPath =
    area === SUPABASE_WORK_AREA.OPERATIONS
      ? PATHS.OPERATIONS.CALENDAR
      : PATHS.RESERVATIONS.CALENDAR;
  const items: SystemNavigationItem[] = [
    {
      label: SYSTEM_NAVIGATION_COPY.BOARD,
      href: PATHS.BOARD,
      icon: MATERIAL_ICON_NAME.DASHBOARD,
    },
    {
      label: SYSTEM_NAVIGATION_COPY.CALENDAR,
      href: calendarPath,
      icon: MATERIAL_ICON_NAME.EVENT,
    },
  ];

  if (area === SUPABASE_WORK_AREA.OPERATIONS) {
    items.push({
      label: SYSTEM_NAVIGATION_COPY.INVENTORY,
      href: PATHS.OPERATIONS.INVENTORY,
      icon: MATERIAL_ICON_NAME.DIRECTIONS_BOAT,
    });
  }

  items.push({
    label: SYSTEM_NAVIGATION_COPY.HISTORY,
    href: PATHS.HISTORY.ROOT,
    icon: MATERIAL_ICON_NAME.HISTORY,
  });

  return items;
};
