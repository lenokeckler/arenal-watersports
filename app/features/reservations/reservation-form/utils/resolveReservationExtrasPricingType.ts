import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import type { ReservationExtrasPricingType } from "../models/ReservationExtrasPricingType.type";
import type { ReservationType } from "../models/ReservationType.type";

export const resolveReservationExtrasPricingType = (
  reservationType: NullableUndefined<ReservationType>
): NullableRef<ReservationExtrasPricingType> => {
  if (
    reservationType === RESERVATION_TYPE.RENTAL ||
    reservationType === RESERVATION_TYPE.TOUR
  ) {
    return reservationType;
  }
  return null;
};
