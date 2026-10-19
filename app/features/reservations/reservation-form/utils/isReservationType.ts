import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationType } from "../models/ReservationType.type";

export const isReservationType = (
  value: unknown
): value is ReservationType =>
  value === RESERVATION_TYPE.COMBO ||
  value === RESERVATION_TYPE.RENTAL ||
  value === RESERVATION_TYPE.TOUR;
