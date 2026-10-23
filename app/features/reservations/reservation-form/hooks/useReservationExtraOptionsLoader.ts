import type { NullableRef } from "@/app/types";
import { useReservationExtraOptionsRequestEffect } from "./useReservationExtraOptionsRequestEffect";
import { useReservationExtraOptionsRequestState } from "./useReservationExtraOptionsRequestState";
import type { ReservationExtraOptionsRequestState } from "../models/ReservationExtraOptionsRequestState.interface";

export const useReservationExtraOptionsLoader = (
  unitId: string,
  requestKey: NullableRef<string>
): ReservationExtraOptionsRequestState => {
  const { onFailed, onLoaded, state } =
    useReservationExtraOptionsRequestState(requestKey);
  useReservationExtraOptionsRequestEffect(
    unitId,
    requestKey,
    onLoaded,
    onFailed
  );
  return state;
};
