import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import type { SystemNavigationMenuDestination } from "../models/SystemNavigationMenuDestination.interface";
import type { SystemNavigationMenuSection } from "../models/SystemNavigationMenuSection.interface";
import { SYSTEM_NAVIGATION_COPY } from "./SystemNavigationCopy.constants";

export const SYSTEM_NAVIGATION_MENU_SECTIONS: Readonly<
  Record<WorkArea, readonly SystemNavigationMenuSection[]>
> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]: [
    {
      label: SYSTEM_NAVIGATION_COPY.PRICES_SECTION,
      destinations: [
        {
          label: SYSTEM_NAVIGATION_COPY.TARIFFS,
          href: PATHS.ADMINISTRATION.TARIFFS,
          icon: MATERIAL_ICON_NAME.SELL,
        },
        {
          label: SYSTEM_NAVIGATION_COPY.COMBOS,
          href: PATHS.ADMINISTRATION.COMBOS,
          icon: MATERIAL_ICON_NAME.INVENTORY_2,
        },
      ],
    },
  ],
  [SUPABASE_WORK_AREA.OPERATIONS]: [],
  [SUPABASE_WORK_AREA.RESERVATIONS]: [],
};

export const SYSTEM_NAVIGATION_PROFILE_DESTINATION: SystemNavigationMenuDestination =
  {
    label: SYSTEM_NAVIGATION_COPY.PROFILE,
    href: PATHS.PROFILE.ROOT,
    icon: MATERIAL_ICON_NAME.PERSON,
  };

export const SYSTEM_NAVIGATION_CHANGE_MODE_DESTINATION: SystemNavigationMenuDestination =
  {
    label: SYSTEM_NAVIGATION_COPY.CHANGE_MODE,
    href: PATHS.MODE,
    icon: MATERIAL_ICON_NAME.SWAP_HORIZ,
  };
