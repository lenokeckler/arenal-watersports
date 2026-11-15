"use client";

import { useState } from "react";
import type { ReservationDetailMoneyMovementsToggleViewModel } from "../models/ReservationDetailMoneyMovementsToggleViewModel.interface";

export const useReservationDetailMoneyMovementsToggleViewModel =
  (): ReservationDetailMoneyMovementsToggleViewModel => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = (): void => {
      setIsOpen((current) => !current);
    };

    return { isOpen, toggle };
  };
