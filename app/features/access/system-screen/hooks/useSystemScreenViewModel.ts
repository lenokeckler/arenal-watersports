"use client";

import { usePathname } from "next/navigation";
import type { NullableRef } from "@/app/types";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";
import { shouldShowSystemNavigation } from "@/app/utils/work-mode/shouldShowSystemNavigation";
import type { SystemScreenViewModel } from "../models/SystemScreenViewModel.interface";

export const useSystemScreenViewModel = (
  overview: NullableRef<WorkModeOverview>
): SystemScreenViewModel => {
  const pathname = usePathname();

  return {
    hasBottomNavigation: shouldShowSystemNavigation(
      overview,
      pathname
    ),
  };
};
