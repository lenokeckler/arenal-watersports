import { useRouter } from "next/navigation";
import type { UnitReservationHistoryViewModel } from "../models/UnitReservationHistoryViewModel.interface";
import type { UnitReservationHistoryViewModelProps } from "../models/UnitReservationHistoryViewModelProps.interface";
import { buildUnitReservationRowViewModel } from "../utils/buildUnitReservationRowViewModel";
import { resolveUnitListViewState } from "../utils/resolveUnitListViewState";

export const useUnitReservationHistoryViewModel = ({
  fetchFailed,
  reservations,
}: UnitReservationHistoryViewModelProps): UnitReservationHistoryViewModel => {
  const router = useRouter();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    onRetry,
    rows: reservations.map(
      buildUnitReservationRowViewModel
    ),
    viewState: resolveUnitListViewState(
      fetchFailed,
      reservations.length
    ),
  };
};
