import { COMBO_STATUS } from "../constants/ComboStatus.constants";

export type ComboStatus =
  (typeof COMBO_STATUS)[keyof typeof COMBO_STATUS];
