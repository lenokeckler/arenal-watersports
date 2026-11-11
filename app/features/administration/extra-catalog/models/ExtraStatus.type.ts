import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";

export type ExtraStatus =
  (typeof EXTRA_STATUS)[keyof typeof EXTRA_STATUS];
