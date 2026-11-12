import { KEYBOARD } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const closeOnOutsidePointer = (
  event: PointerEvent,
  navigationElement: NullableRef<HTMLElement>,
  closeMenu: () => void
): void => {
  const target = event.target;

  if (
    target instanceof Node &&
    !navigationElement?.contains(target)
  ) {
    closeMenu();
  }
};

export const closeOnEscape = (
  event: KeyboardEvent,
  closeMenu: () => void
): void => {
  if (event.key === KEYBOARD.ESCAPE) {
    closeMenu();
  }
};
