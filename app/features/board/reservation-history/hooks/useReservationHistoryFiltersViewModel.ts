"use client";

import { useEffect, useState } from "react";
import { RESERVATION_HISTORY_WINDOW_EVENT } from "../constants/ReservationHistoryWindowEvent.constants";
import type { ReservationHistoryFieldChange } from "../models/ReservationHistoryFieldChange.interface";
import type { ReservationHistoryFiltersViewModel } from "../models/ReservationHistoryFiltersViewModel.interface";
import type { ReservationHistoryFiltersViewModelProps } from "../models/ReservationHistoryFiltersViewModelProps.interface";
import { buildReservationHistoryFilterValues } from "../utils/buildReservationHistoryFilterValues";

export const useReservationHistoryFiltersViewModel = ({
  filters,
}: ReservationHistoryFiltersViewModelProps): ReservationHistoryFiltersViewModel => {
  const [values, setValues] = useState(() =>
    buildReservationHistoryFilterValues(filters)
  );
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsPending(false);
      }
    };

    window.addEventListener(
      RESERVATION_HISTORY_WINDOW_EVENT.PAGE_SHOW,
      handlePageShow
    );

    return () => {
      window.removeEventListener(
        RESERVATION_HISTORY_WINDOW_EVENT.PAGE_SHOW,
        handlePageShow
      );
    };
  }, []);

  const handleChange = ({
    target: { name, value },
  }: ReservationHistoryFieldChange): void => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (): void => {
    setIsPending(true);
  };

  return { handleChange, handleSubmit, isPending, values };
};
