import { useRouter } from "next/navigation";
import type { UnitListViewModel } from "../models/UnitListViewModel.interface";
import type { UnitListViewModelProps } from "../models/UnitListViewModelProps.interface";
import { buildUnitCardViewModel } from "../utils/buildUnitCardViewModel";
import { resolveUnitListViewState } from "../utils/resolveUnitListViewState";

export const useUnitListViewModel = ({
  category,
  fetchFailed,
  units,
}: UnitListViewModelProps): UnitListViewModel => {
  const router = useRouter();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: units.map((unit) =>
      buildUnitCardViewModel(unit, category)
    ),
    onRetry,
    viewState: resolveUnitListViewState(
      fetchFailed,
      units.length
    ),
  };
};
