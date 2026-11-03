import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";

export const shouldShowReservationExtras = (
  viewModel: ReservationFormViewModel
): boolean =>
  viewModel.values.reservationType !==
    RESERVATION_TYPE.COMBO &&
  viewModel.values.unitId !== STRING.Empty;
