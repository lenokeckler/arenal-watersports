import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";

export type ExtraListViewState =
  (typeof EXTRA_LIST_VIEW_STATE)[keyof typeof EXTRA_LIST_VIEW_STATE];
