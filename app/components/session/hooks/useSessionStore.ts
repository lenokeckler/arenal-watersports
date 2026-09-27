import { useCallback } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/store/hooks";
import { STORE_SLICES } from "@/app/constants";
import { sessionActions } from "@/app/store";

export const useSessionStore = () => {
  const dispatch = useAppDispatch();
  const { hasActiveUser } = useAppSelector(
    (state) => state[STORE_SLICES.SESSION]
  );

  const setHasActiveUser = useCallback(
    (value: boolean) => {
      dispatch(sessionActions.setHasActiveUser(value));
    },
    [dispatch]
  );

  const resetSession = useCallback(() => {
    dispatch(sessionActions.resetSession());
  }, [dispatch]);

  return {
    hasActiveUser,
    setHasActiveUser,
    resetSession,
  };
};
