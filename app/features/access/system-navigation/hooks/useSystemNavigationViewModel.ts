"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";
import { hasSeveralWorkAreas } from "@/app/utils/work-mode/hasSeveralWorkAreas";
import { buildSystemNavigationItems } from "../constants/SystemNavigationItems.constants";
import type { SystemNavigationViewModel } from "../models/SystemNavigationViewModel.interface";

export const useSystemNavigationViewModel = (
  overview: WorkModeOverview
): SystemNavigationViewModel => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const area = overview.current;
  const isCurrentAreaGranted =
    area !== null && overview.areas.includes(area);
  const isSupportedArea =
    area === SUPABASE_WORK_AREA.OPERATIONS ||
    area === SUPABASE_WORK_AREA.RESERVATIONS;

  return {
    items: area ? buildSystemNavigationItems(area) : [],
    pathname,
    isMenuOpen,
    toggleMenu: () => setIsMenuOpen((isOpen) => !isOpen),
    closeMenu: () => setIsMenuOpen(false),
    canChangeMode: hasSeveralWorkAreas(overview),
    canShowNavigation:
      isCurrentAreaGranted && isSupportedArea,
  };
};
