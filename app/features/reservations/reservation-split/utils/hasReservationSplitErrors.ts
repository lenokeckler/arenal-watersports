import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import type { ReservationSplitDepartureErrors } from "../models/ReservationSplitDepartureErrors.interface";

export const hasReservationSplitErrors = (
  errors: ReservationSplitDepartureErrors
): boolean =>
  Object.keys(errors).length > RESERVATION_SPLIT_DRAFT.NONE;
