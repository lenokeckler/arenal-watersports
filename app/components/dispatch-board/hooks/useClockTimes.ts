"use client";

import { useState } from "react";
import { DISPATCH_TIME_ADJUSTMENT } from "../constants/DispatchGroupSteps.constants";
import type { DispatchTimesViewModel } from "../models/DispatchTimesViewModel.interface";
import type { DispatchClockTimes } from "../models/DispatchClockTimes.interface";
import { addMinutesToClockTime } from "../utils/addMinutesToClockTime";
import { getClockSpanMinutes } from "../utils/getClockSpanMinutes";
import { parseClockTime } from "../utils/parseClockTime";

export const useClockTimes = (
  getInitialTimes: () => DispatchClockTimes
): DispatchTimesViewModel => {
  const [times, setTimes] = useState(getInitialTimes);
  const departureMinutes = parseClockTime(
    times.departureTime
  );
  const returnMinutes = parseClockTime(times.returnTime);
  const hasValidTimes =
    departureMinutes !== null && returnMinutes !== null;
  const span = getClockSpanMinutes(
    times.departureTime,
    times.returnTime
  );

  const changeDeparture = (departureTime: string): void => {
    setTimes({
      departureTime,
      returnTime: Number.isNaN(span)
        ? times.returnTime
        : addMinutesToClockTime(departureTime, span),
    });
  };

  const changeReturn = (returnTime: string): void => {
    setTimes({ ...times, returnTime });
  };

  const shiftDeparture = (direction: number): void => {
    changeDeparture(
      addMinutesToClockTime(
        times.departureTime,
        direction * DISPATCH_TIME_ADJUSTMENT.STEP_MINUTES
      )
    );
  };

  const shiftReturn = (direction: number): void => {
    changeReturn(
      addMinutesToClockTime(
        times.returnTime,
        direction * DISPATCH_TIME_ADJUSTMENT.STEP_MINUTES
      )
    );
  };

  return {
    departureTime: times.departureTime,
    durationMinutes: hasValidTimes ? span : null,
    handleDepartureChange: (event) =>
      changeDeparture(event.target.value),
    handleReturnChange: (event) =>
      changeReturn(event.target.value),
    handleShiftDeparture: shiftDeparture,
    handleShiftReturn: shiftReturn,
    hasValidTimes,
    isNextDay:
      hasValidTimes && returnMinutes <= departureMinutes,
    returnTime: times.returnTime,
    times,
  };
};
