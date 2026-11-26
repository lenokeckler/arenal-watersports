import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkArea } from "@/app/types";
import type { SystemNavigationMenuDestination } from "../models/SystemNavigationMenuDestination.interface";
import { SYSTEM_NAVIGATION_COPY } from "./SystemNavigationCopy.constants";

export const SYSTEM_NAVIGATION_MENU_DESTINATIONS: Readonly<
  Record<
    WorkArea,
    readonly SystemNavigationMenuDestination[]
  >
> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]: [
    {
      label: SYSTEM_NAVIGATION_COPY.COMBOS,
      href: PATHS.ADMINISTRATION.COMBOS,
    },
  ],
  [SUPABASE_WORK_AREA.OPERATIONS]: [],
  [SUPABASE_WORK_AREA.RESERVATIONS]: [],
};
