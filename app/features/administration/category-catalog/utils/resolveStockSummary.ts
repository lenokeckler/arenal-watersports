import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { resolveCountLabel } from "./resolveCountLabel";

export const resolveStockSummary = (
  currentQuantity: number
): string =>
  resolveCountLabel(
    currentQuantity,
    CATEGORY_CATALOG_COPY.UNIT_COUNT_SINGULAR,
    CATEGORY_CATALOG_COPY.UNIT_COUNT_PLURAL
  );
