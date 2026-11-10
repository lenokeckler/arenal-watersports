"use client";

import { usePathname } from "next/navigation";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import { shouldShowSystemNavigation } from "@/app/utils/work-mode/shouldShowSystemNavigation";
import { buildSystemNavigationItems } from "../utils/buildSystemNavigationItems";
import { useSystemNavigationMenuDismissal } from "./useSystemNavigationMenuDismissal";
import { useSystemNavigationMenuState } from "./useSystemNavigationMenuState";
import type { SystemNavigationViewModelResult } from "../models/SystemNavigationViewModelResult.type";

export const useSystemNavigationViewModel = (
  overview: WorkModeOverview
): SystemNavigationViewModelResult => {
  const pathname = usePathname();
  const menuState = useSystemNavigationMenuState(pathname);
  const navigationRef = useSystemNavigationMenuDismissal(
    menuState.isMenuOpen,
    menuState.closeMenu
  );
  const area = overview.current;

  const viewModel = {
    items: area ? buildSystemNavigationItems(area) : [],
    pathname,
    ...menuState,
    canChangeMode: hasSeveralWorkAreas(overview),
    canShowNavigation: shouldShowSystemNavigation(
      overview,
      pathname
    ),
    showMenuButton:
      area !== SUPABASE_WORK_AREA.ADMINISTRATION,
  };

  return [viewModel, navigationRef];
};
