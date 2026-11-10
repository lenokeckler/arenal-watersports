import type { ReservationGuideLoadFailure } from "./ReservationGuideLoadFailure.interface";
import type { ReservationGuideLoadSuccess } from "./ReservationGuideLoadSuccess.interface";

export type ReservationGuideLoadResult =
  ReservationGuideLoadFailure | ReservationGuideLoadSuccess;
