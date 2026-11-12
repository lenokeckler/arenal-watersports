import type { Nullable } from "@/app/types";

export const TOAST_CONTAINER_CLASS =
  "fixed z-50 pointer-events-auto flex w-full max-w-[20rem] flex-col space-y-2 px-4";

export const TOAST_CONTAINER_MOBILE_CLASS =
  "top-30 left-1/2 transform -translate-x-1/2";

export const TOAST_CONTAINER_DESKTOP_CLASS =
  "top-24 left-1/2 transform -translate-x-1/2";

export const resolveToastContainerClassName = (
  isMobile: Nullable<boolean>
): string =>
  `${TOAST_CONTAINER_CLASS} ${
    isMobile
      ? TOAST_CONTAINER_MOBILE_CLASS
      : TOAST_CONTAINER_DESKTOP_CLASS
  }`;
