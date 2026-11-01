"use client";

import { useState } from "react";
import type { ReservationHistoryFilterChangeEvent } from "../models/ReservationHistoryFilterChangeEvent.type";
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

  const handleChange = ({
    target: { name, value },
  }: ReservationHistoryFilterChangeEvent): void => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (): void => {
    setIsPending(true);
  };

  return { handleChange, handleSubmit, isPending, values };
};
