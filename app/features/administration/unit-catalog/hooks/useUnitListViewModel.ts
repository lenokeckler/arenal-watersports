import { useRouter } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";
import type { UnitListViewModel } from "../models/UnitListViewModel.interface";
import type { UnitListViewModelProps } from "../models/UnitListViewModelProps.interface";
import type { UnitListViewState } from "../models/UnitListViewState.type";
import { buildUnitCardViewModel } from "../utils/buildUnitCardViewModel";

const resolveUnitListViewState = (
  fetchFailed: boolean,
  unitCount: number
): UnitListViewState => {
  if (fetchFailed) {
    return UNIT_LIST_VIEW_STATE.ERROR;
  }

  if (unitCount === LENGTH.ZERO) {
    return UNIT_LIST_VIEW_STATE.EMPTY;
  }

  return UNIT_LIST_VIEW_STATE.READY;
};

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
