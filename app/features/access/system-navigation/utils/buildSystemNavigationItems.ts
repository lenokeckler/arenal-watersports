import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import type { SystemNavigationItem } from "../models/SystemNavigationItem.interface";
import {
  SYSTEM_NAVIGATION_CALENDAR_ITEM,
  SYSTEM_NAVIGATION_ITEMS,
  SYSTEM_NAVIGATION_INVENTORY_ITEM,
} from "../constants/SystemNavigationItems.constants";

export const buildSystemNavigationItems = (
  area: WorkArea
): readonly SystemNavigationItem[] => {
  const calendarPath =
    area === SUPABASE_WORK_AREA.OPERATIONS
      ? PATHS.OPERATIONS.CALENDAR
      : PATHS.RESERVATIONS.CALENDAR;
  const calendarItem = {
    ...SYSTEM_NAVIGATION_CALENDAR_ITEM,
    href: calendarPath,
  };
  const inventoryItems =
    area === SUPABASE_WORK_AREA.OPERATIONS
      ? [SYSTEM_NAVIGATION_INVENTORY_ITEM]
      : [];

  return [
    SYSTEM_NAVIGATION_ITEMS.BOARD,
    calendarItem,
    ...inventoryItems,
    SYSTEM_NAVIGATION_ITEMS.HISTORY,
  ];
};
