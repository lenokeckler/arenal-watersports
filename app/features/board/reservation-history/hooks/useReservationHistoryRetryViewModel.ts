"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import type { ReservationHistoryRetryViewModel } from "../models/ReservationHistoryRetryViewModel.interface";
import type { UseReservationHistoryRetryViewModelProps } from "../models/UseReservationHistoryRetryViewModelProps.interface";

export const useReservationHistoryRetryViewModel = ({
  reset,
}: UseReservationHistoryRetryViewModelProps): ReservationHistoryRetryViewModel => {
  const router = useRouter();

  const handleRetry = (): void => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return { handleRetry };
};
