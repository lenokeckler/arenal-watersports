import { RESERVATION_TYPE } from "./ReservationType.constants";

export const RESERVATION_EXTRAS_PRICING = {
  RESERVATION_TYPE: {
    RENTAL: RESERVATION_TYPE.RENTAL,
    TOUR: RESERVATION_TYPE.TOUR,
  },
} as const;
