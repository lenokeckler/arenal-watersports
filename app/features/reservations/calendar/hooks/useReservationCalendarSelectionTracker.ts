import { useState } from "react";
import type { ReservationCalendarSelectionTracker } from "../models/ReservationCalendarSelectionTracker.interface";
import { createReservationCalendarSelectionTracker } from "../utils/createReservationCalendarSelectionTracker";

export const useReservationCalendarSelectionTracker =
  (): ReservationCalendarSelectionTracker => {
    const [tracker] = useState(
      createReservationCalendarSelectionTracker
    );
    return tracker;
  };
