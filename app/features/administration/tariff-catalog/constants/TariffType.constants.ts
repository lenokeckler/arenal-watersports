import { RESERVATION_TYPE } from "@/app/constants";

export const TARIFF_TYPE = {
  RENTAL: RESERVATION_TYPE.RENTAL,
  TOUR: RESERVATION_TYPE.TOUR,
} as const;
