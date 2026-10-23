import type { NullableUndefined } from "@/app/types";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationExtraOptionsViewModel } from "../models/ReservationExtraOptionsViewModel.interface";
import type { ReservationType } from "../models/ReservationType.type";
import { useReservationExtraOptionsRequest } from "./useReservationExtraOptionsRequest";

const isReservationExtrasUnit = (
  unitId: string,
  reservationType: NullableUndefined<ReservationType>
): boolean =>
  (reservationType === RESERVATION_TYPE.RENTAL ||
    reservationType === RESERVATION_TYPE.TOUR) &&
  RESERVATION_EXTRA.UUID_PATTERN.test(unitId);

export const useReservationExtraOptions = (
  unitId: string,
  reservationType: NullableUndefined<ReservationType>
): ReservationExtraOptionsViewModel => {
  const requestKey = isReservationExtrasUnit(
    unitId,
    reservationType
  )
    ? unitId
    : null;
  return useReservationExtraOptionsRequest(
    unitId,
    requestKey
  );
};
