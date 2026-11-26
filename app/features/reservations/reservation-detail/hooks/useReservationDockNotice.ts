"use client";

import { useState, useTransition } from "react";
import type { NullableRef } from "@/app/types";
import { submitReservationDockNotice } from "../actions/submitReservationDockNotice";
import { RESERVATION_DOCK_NOTICE_COPY } from "../constants/ReservationDockNotice.constants";
import type { ReservationDetailDockActionProps } from "../models/ReservationDetailDockActionProps.interface";
import type { ReservationDockNoticeViewModel } from "../models/ReservationDockNoticeViewModel.interface";

export const useReservationDockNotice = ({
  dockNotifiedAt,
  reservationId,
}: Pick<
  ReservationDetailDockActionProps,
  "dockNotifiedAt" | "reservationId"
>): ReservationDockNoticeViewModel => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] =
    useState<NullableRef<string>>(null);
  const isNotified = dockNotifiedAt !== null;

  const handleToggle = (): void => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await submitReservationDockNotice({
        isNotified: !isNotified,
        reservationId,
      });

      if (!result.isOk) {
        setErrorMessage(RESERVATION_DOCK_NOTICE_COPY.ERROR);
      }
    });
  };

  return {
    errorMessage,
    handleToggle,
    isNotified,
    isPending,
  };
};
