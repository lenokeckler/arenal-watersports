import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";

export type CategoryListViewState =
  (typeof CATEGORY_LIST_VIEW_STATE)[keyof typeof CATEGORY_LIST_VIEW_STATE];
