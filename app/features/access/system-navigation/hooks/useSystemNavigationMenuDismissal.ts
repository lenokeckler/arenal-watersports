import { useCallback, useState } from "react";
import type { RefCallback } from "react";
import type { NullableRef } from "@/app/types";
import { useSystemNavigationMenuDismissalListeners } from "./useSystemNavigationMenuDismissalListeners";

export const useSystemNavigationMenuDismissal = (
  isMenuOpen: boolean,
  closeMenu: () => void
): RefCallback<HTMLElement> => {
  const [navigationElement, setNavigationElement] =
    useState<NullableRef<HTMLElement>>(null);
  const navigationRef = useCallback(
    (element: NullableRef<HTMLElement>): void => {
      setNavigationElement(element);
    },
    []
  );

  useSystemNavigationMenuDismissalListeners(
    isMenuOpen,
    navigationElement,
    closeMenu
  );

  return navigationRef;
};
