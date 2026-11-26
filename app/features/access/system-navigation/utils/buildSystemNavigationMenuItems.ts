import type { WorkArea } from "@/app/types";
import { SYSTEM_NAVIGATION_MENU_DESTINATIONS } from "../constants/SystemNavigationMenuDestinations.constants";
import type { SystemNavigationMenuDestination } from "../models/SystemNavigationMenuDestination.interface";

export const buildSystemNavigationMenuItems = (
  area: WorkArea
): readonly SystemNavigationMenuDestination[] =>
  SYSTEM_NAVIGATION_MENU_DESTINATIONS[area];
