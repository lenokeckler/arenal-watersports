"use client";

import type { DispatchTimesViewModel } from "../models/DispatchTimesViewModel.interface";
import { addMinutesToClockTime } from "../utils/addMinutesToClockTime";
import { formatCostaRicaTime } from "../utils/formatCostaRicaTime";
import { useClockTimes } from "./useClockTimes";

export const useDispatchTimes = (
  durationMinutes: number
): DispatchTimesViewModel =>
  useClockTimes(() => {
    const departureTime = formatCostaRicaTime(new Date());

    return {
      departureTime,
      returnTime: addMinutesToClockTime(
        departureTime,
        durationMinutes
      ),
    };
  });
