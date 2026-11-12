import { LENGTH } from "@/app/constants";
import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";
import type { UnitListViewState } from "../models/UnitListViewState.type";

export const resolveUnitListViewState = (
  fetchFailed: boolean,
  itemCount: number
): UnitListViewState => {
  if (fetchFailed) {
    return UNIT_LIST_VIEW_STATE.ERROR;
  }

  if (itemCount === LENGTH.ZERO) {
    return UNIT_LIST_VIEW_STATE.EMPTY;
  }

  return UNIT_LIST_VIEW_STATE.READY;
};
