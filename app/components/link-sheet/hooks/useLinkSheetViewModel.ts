"use client";

import { useRouter } from "next/navigation";
import { useIsHydrated } from "@/app/utils/hydration/useIsHydrated";
import type { LinkSheetViewModel } from "../models/LinkSheetViewModel.interface";

export const useLinkSheetViewModel = (
  closeHref: string
): LinkSheetViewModel => {
  const router = useRouter();

  return {
    close: () =>
      router.replace(closeHref, { scroll: false }),
    isReady: useIsHydrated(),
  };
};
