import { CATEGORY_CONFIGURE_TONE } from "../constants/CategoryConfigureTone.constants";

export type CategoryConfigureTone =
  (typeof CATEGORY_CONFIGURE_TONE)[keyof typeof CATEGORY_CONFIGURE_TONE];
