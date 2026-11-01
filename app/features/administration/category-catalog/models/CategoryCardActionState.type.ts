import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";

export type CategoryCardActionState =
  (typeof CATEGORY_CARD_ACTION_STATE)[keyof typeof CATEGORY_CARD_ACTION_STATE];
