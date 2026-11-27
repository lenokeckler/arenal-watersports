import type { ComboStatus } from "../models/ComboStatus.type";
import { COMBO_CATALOG_COPY } from "./ComboCatalogCopy.constants";
import { COMBO_STATUS } from "./ComboStatus.constants";

export const COMBO_STATUS_LABEL: Record<
  ComboStatus,
  string
> = {
  [COMBO_STATUS.ACTIVE]:
    COMBO_CATALOG_COPY.STATUS_LABEL_ACTIVE,
  [COMBO_STATUS.INACTIVE]:
    COMBO_CATALOG_COPY.STATUS_LABEL_INACTIVE,
};
