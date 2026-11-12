import type { ReservationExtraOption } from "./ReservationExtraOption.interface";
import type { ReservationExtraOptionsRequestState } from "./ReservationExtraOptionsRequestState.interface";

export interface ReservationExtraOptionsRequestController {
  onFailed: (error: unknown) => void;
  onLoaded: (options: ReservationExtraOption[]) => void;
  state: ReservationExtraOptionsRequestState;
}
