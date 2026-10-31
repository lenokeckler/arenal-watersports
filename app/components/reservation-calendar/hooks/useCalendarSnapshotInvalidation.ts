import { useCallback, useEffect } from "react";
import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";
import type { NullableRef } from "@/app/types";

export const useCalendarSnapshotInvalidation = (
  sequenceRef: RefObject<number>,
  setRefreshError: Dispatch<
    SetStateAction<NullableRef<Error>>
  >,
  setIsRefreshing: Dispatch<SetStateAction<boolean>>
): (() => void) => {
  useEffect(
    () => () => {
      sequenceRef.current += 1;
    },
    [sequenceRef]
  );
  return useCallback(() => {
    sequenceRef.current += 1;
    setRefreshError(null);
    setIsRefreshing(false);
  }, [sequenceRef, setRefreshError, setIsRefreshing]);
};
