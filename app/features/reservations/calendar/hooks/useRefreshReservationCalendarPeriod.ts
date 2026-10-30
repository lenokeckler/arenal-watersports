import { useState } from "react";
import type { ReservationCalendarRefreshDependencies } from "../models/ReservationCalendarRefreshDependencies.interface";
import type { ReservationCalendarRefreshController } from "../models/ReservationCalendarRefreshController.interface";
import { createReservationCalendarRefreshController } from "../utils/createReservationCalendarRefreshController";

export const useRefreshReservationCalendarPeriod = ({
  setState,
}: ReservationCalendarRefreshDependencies): ReservationCalendarRefreshController => {
  const [controller] = useState(() =>
    createReservationCalendarRefreshController(setState)
  );
  return controller;
};
