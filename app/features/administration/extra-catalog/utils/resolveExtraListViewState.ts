import { LENGTH } from "@/app/constants";
import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";
import type { ExtraListViewState } from "../models/ExtraListViewState.type";

export const resolveExtraListViewState = (
  fetchFailed: boolean,
  extraCount: number
): ExtraListViewState => {
  if (fetchFailed) {
    return EXTRA_LIST_VIEW_STATE.ERROR;
  }

  if (extraCount === LENGTH.ZERO) {
    return EXTRA_LIST_VIEW_STATE.EMPTY;
  }

  return EXTRA_LIST_VIEW_STATE.READY;
};
