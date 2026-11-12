import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";

const TRACKING_MODE_LOWERCASE_LABEL: Record<
  CategoryTrackingMode,
  string
> = {
  [CATEGORY_TRACKING_MODE.BY_QUANTITY]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LOWERCASE,
  [CATEGORY_TRACKING_MODE.BY_UNIT]:
    CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LOWERCASE,
};

export const resolveGroupConflictErrorMessage = (
  existingTrackingMode: CategoryTrackingMode,
  attemptedTrackingMode: CategoryTrackingMode
): string =>
  `Este grupo ya tiene categorías ${TRACKING_MODE_LOWERCASE_LABEL[existingTrackingMode]}; esta es ${TRACKING_MODE_LOWERCASE_LABEL[attemptedTrackingMode]}.`;
