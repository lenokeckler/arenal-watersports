"use client";

import { useCallback, useSyncExternalStore } from "react";
import { TYPE_OF } from "@/app/constants";
import type { NullableRef } from "@/app/types";

const findQuery = (
  query: string
): NullableRef<MediaQueryList> =>
  typeof window.matchMedia === TYPE_OF.FUNCTION
    ? window.matchMedia(query)
    : null;

export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const list = findQuery(query);
      list?.addEventListener("change", onChange);

      return () =>
        list?.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => findQuery(query)?.matches ?? false,
    () => false
  );
};
