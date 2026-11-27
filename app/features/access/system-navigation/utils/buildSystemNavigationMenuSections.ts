import type { WorkArea } from "@/app/types";
import { SYSTEM_NAVIGATION_COPY } from "../constants/SystemNavigationCopy.constants";
import {
  SYSTEM_NAVIGATION_CHANGE_MODE_DESTINATION,
  SYSTEM_NAVIGATION_MENU_SECTIONS,
  SYSTEM_NAVIGATION_PROFILE_DESTINATION,
} from "../constants/SystemNavigationMenuSections.constants";
import type { SystemNavigationMenuSection } from "../models/SystemNavigationMenuSection.interface";

const buildAccountSection = (
  canChangeMode: boolean
): SystemNavigationMenuSection => ({
  label: SYSTEM_NAVIGATION_COPY.ACCOUNT_SECTION,
  destinations: canChangeMode
    ? [
        SYSTEM_NAVIGATION_PROFILE_DESTINATION,
        SYSTEM_NAVIGATION_CHANGE_MODE_DESTINATION,
      ]
    : [SYSTEM_NAVIGATION_PROFILE_DESTINATION],
});

export const buildSystemNavigationMenuSections = (
  area: WorkArea,
  canChangeMode: boolean
): readonly SystemNavigationMenuSection[] => [
  ...SYSTEM_NAVIGATION_MENU_SECTIONS[area],
  buildAccountSection(canChangeMode),
];
