import { STRING } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationFormViewModelWithExtras } from "../models/ReservationExtrasComponentProps.interface";
import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";

export const shouldShowReservationExtras = (
  viewModel: ReservationFormViewModel
): viewModel is ReservationFormViewModelWithExtras =>
  viewModel.extras !== undefined &&
  viewModel.values.reservationType !==
    RESERVATION_TYPE.COMBO &&
  viewModel.values.unitId !== STRING.Empty;
