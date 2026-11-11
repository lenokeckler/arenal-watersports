"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import type { ReservationHistoryRetryViewModel } from "../models/ReservationHistoryRetryViewModel.interface";
import type { ReservationHistoryResetProps } from "../models/ReservationHistoryResetProps.interface";

export const useReservationHistoryRetryViewModel = ({
  reset,
}: ReservationHistoryResetProps): ReservationHistoryRetryViewModel => {
  const router = useRouter();

  const handleRetry = (): void => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return { handleRetry };
};
