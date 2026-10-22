import type { useReservationGuideLoadViewModel } from "../hooks/useReservationGuideLoadViewModel";
import type { ReservationFormViewModelSetup } from "./ReservationFormViewModelSetup.interface";

export interface ReservationFormViewModelComposition extends ReservationFormViewModelSetup {
  guideLoad: ReturnType<
    typeof useReservationGuideLoadViewModel
  >;
}
