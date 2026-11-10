import { useEffect } from "react";
import { EVENT } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  closeOnEscape,
  closeOnOutsidePointer,
} from "../utils/systemNavigationMenuDismissalHandlers";

export const useSystemNavigationMenuDismissalListeners = (
  isMenuOpen: boolean,
  navigationElement: NullableRef<HTMLElement>,
  closeMenu: () => void
): void => {
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent): void =>
      closeOnOutsidePointer(
        event,
        navigationElement,
        closeMenu
      );
    const handleKeyDown = (event: KeyboardEvent): void =>
      closeOnEscape(event, closeMenu);

    document.addEventListener(
      EVENT.POINTERDOWN,
      handlePointerDown
    );
    document.addEventListener(EVENT.KEYDOWN, handleKeyDown);

    return () => {
      document.removeEventListener(
        EVENT.POINTERDOWN,
        handlePointerDown
      );
      document.removeEventListener(
        EVENT.KEYDOWN,
        handleKeyDown
      );
    };
  }, [closeMenu, isMenuOpen, navigationElement]);
};
