import { useCallback, useState } from "react";
import type { SystemNavigationMenuState } from "../models/SystemNavigationMenuState.interface";

export const useSystemNavigationMenuState = (
  pathname: string
): SystemNavigationMenuState => {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    pathname,
  });

  if (menuState.pathname !== pathname) {
    setMenuState({ isOpen: false, pathname });
  }

  const isMenuOpen =
    menuState.pathname === pathname && menuState.isOpen;
  const toggleMenu = useCallback(() => {
    setMenuState((currentState) => ({
      ...currentState,
      isOpen: !isMenuOpen,
    }));
  }, [isMenuOpen]);
  const closeMenu = useCallback(() => {
    setMenuState((currentState) => ({
      ...currentState,
      isOpen: false,
    }));
  }, []);

  return { isMenuOpen, toggleMenu, closeMenu };
};
