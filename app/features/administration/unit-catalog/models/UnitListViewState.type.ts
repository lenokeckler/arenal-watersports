import { UNIT_LIST_VIEW_STATE } from "../constants/UnitListViewState.constants";

export type UnitListViewState =
  (typeof UNIT_LIST_VIEW_STATE)[keyof typeof UNIT_LIST_VIEW_STATE];
