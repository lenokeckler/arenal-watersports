import { CATEGORY_CONFIGURE_NEXT_STEP_STATE } from "../constants/CategoryConfigureNextStepState.constants";

export type CategoryConfigureNextStepState =
  (typeof CATEGORY_CONFIGURE_NEXT_STEP_STATE)[keyof typeof CATEGORY_CONFIGURE_NEXT_STEP_STATE];
