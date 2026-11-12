import { RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtraOption } from "./ReservationExtraOption.interface";

export type ReservationExtraOptionsRequestAction =
  | {
      key: string;
      kind: typeof RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION.FAILED;
      message: string;
    }
  | {
      key: string;
      kind: typeof RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION.LOADED;
      options: ReservationExtraOption[];
    };
