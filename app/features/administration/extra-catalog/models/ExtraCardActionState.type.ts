import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";

export type ExtraCardActionState =
  (typeof EXTRA_CARD_ACTION_STATE)[keyof typeof EXTRA_CARD_ACTION_STATE];
