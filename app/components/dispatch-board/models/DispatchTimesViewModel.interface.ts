import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

type DispatchTimeChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export interface DispatchTimesViewModel {
  departureTime: string;
  durationMinutes: NullableRef<number>;
  handleDepartureChange: (
    event: DispatchTimeChangeEvent
  ) => void;
  handleReturnChange: (
    event: DispatchTimeChangeEvent
  ) => void;
  handleShiftDeparture: (direction: number) => void;
  handleShiftReturn: (direction: number) => void;
  hasValidTimes: boolean;
  isNextDay: boolean;
  returnTime: string;
  times: { departureTime: string; returnTime: string };
}
