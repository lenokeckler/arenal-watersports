import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationFormGuideViewModelOptions } from "../models/ReservationFormGuideViewModelOptions.interface";
import { RESERVATION_GUIDE_LOAD_RESULT_KIND } from "../constants/ReservationGuideLoad.constants";
import { useReservationFormViewModel } from "./useReservationFormViewModel";
import { useReservationGuideLoadViewModel } from "./useReservationGuideLoadViewModel";

export const useReservationFormGuideViewModel = (
  options: ReservationFormGuideViewModelOptions
): ReservationGuideAssignmentViewModel => {
  const guideLoad = useReservationGuideLoadViewModel(
    options.guideLoadResult
  );
  const guideOptions =
    guideLoad.result.kind ===
    RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS
      ? guideLoad.result.guides
      : undefined;
  const form = useReservationFormViewModel({
    ...options.formOptions,
    guideOptions,
  });

  return {
    ...form,
    guideLoadResult: guideLoad.result,
    handleRetryGuideLoading: guideLoad.retry,
    isGuideLoading: guideLoad.isLoading,
    isSubmitDisabled:
      form.isSubmitDisabled || guideLoad.isLoading,
  };
};
