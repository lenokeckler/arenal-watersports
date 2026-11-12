import type { NullableRef } from "@/app/types";
import type { ReservationSplitDraftsState } from "./ReservationSplitDraftsState.interface";
import type { ReservationSplitRemainder } from "./ReservationSplitRemainder.interface";

export interface ReservationSplitDraftsApi {
  addDeparture: () => void;
  assignUnit: (
    unitId: string,
    departureKey: NullableRef<string>
  ) => void;
  canAddDeparture: boolean;
  remainder: ReservationSplitRemainder;
  removeDeparture: (key: string) => void;
  setTime: (key: string, time: string) => void;
  state: ReservationSplitDraftsState;
  stepPeopleCount: (key: string, delta: number) => void;
  stepQuantity: (
    key: string,
    itemId: string,
    delta: number
  ) => void;
}
