"use client";

import { useEffect, useRef } from "react";
import type { NullableRef } from "@/app/types";
import { LOGOUT_CONFIRM_RESET_MS } from "../constants/LogoutConfirm.constants";
import type { LogoutConfirmReset } from "../models/LogoutConfirmReset.interface";

export const useLogoutConfirmReset = (
  onExpire: () => void
): LogoutConfirmReset => {
  const timerRef =
    useRef<NullableRef<ReturnType<typeof setTimeout>>>(
      null
    );

  const disarm = (): void => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const arm = (): void => {
    disarm();
    timerRef.current = setTimeout(
      onExpire,
      LOGOUT_CONFIRM_RESET_MS
    );
  };

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  return { arm, disarm };
};
