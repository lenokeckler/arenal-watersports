"use client";

import { useIsHydrated } from "@/app/utils/hydration/useIsHydrated";
import { useMediaQuery } from "@/app/utils/media/useMediaQuery";
import { DAY_PANEL_WIDE_QUERY } from "../constants/DayPanel.constants";
import type { DayPanelViewModel } from "../models/DayPanelViewModel.interface";

export const useDayPanelViewModel =
  (): DayPanelViewModel => {
    const isHydrated = useIsHydrated();
    const isWide = useMediaQuery(DAY_PANEL_WIDE_QUERY);

    return { isSheet: isHydrated && !isWide };
  };
