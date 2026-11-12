import type { ExtraStatus } from "../models/ExtraStatus.type";
import { EXTRA_CATALOG_COPY } from "./ExtraCatalogCopy.constants";
import { EXTRA_STATUS } from "./ExtraStatus.constants";

export const EXTRA_STATUS_LABEL: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]:
    EXTRA_CATALOG_COPY.STATUS_LABEL_ACTIVE,
  [EXTRA_STATUS.INACTIVE]:
    EXTRA_CATALOG_COPY.STATUS_LABEL_INACTIVE,
};
