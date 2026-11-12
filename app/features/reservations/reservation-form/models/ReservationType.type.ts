import { RESERVATION_TYPE } from "../constants/ReservationType.constants";

export type ReservationType =
  (typeof RESERVATION_TYPE)[keyof typeof RESERVATION_TYPE];
