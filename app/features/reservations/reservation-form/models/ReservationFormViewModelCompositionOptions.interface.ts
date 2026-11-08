import type { useReservationFormResources } from "../hooks/useReservationFormResources";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationFormViewModelCompositionOptions {
  guideLoadResult: ReservationGuideLoadResult;
  handleBack: () => void;
  resources: ReturnType<typeof useReservationFormResources>;
}
