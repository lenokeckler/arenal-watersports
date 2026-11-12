import type { ReservationFormViewModelOptions } from "./ReservationFormViewModelOptions.interface";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationFormGuideViewModelOptions {
  formOptions: ReservationFormViewModelOptions;
  guideLoadResult: ReservationGuideLoadResult;
}
