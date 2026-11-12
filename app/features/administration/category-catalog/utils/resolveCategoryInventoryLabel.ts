import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { resolveCountLabel } from "./resolveCountLabel";

export const resolveCategoryInventoryLabel = (
  totalCount: number
): string =>
  [
    CATEGORY_CATALOG_COPY.INVENTORY_COUNT_PREFIX,
    resolveCountLabel(
      totalCount,
      CATEGORY_CATALOG_COPY.CATEGORY_COUNT_SINGULAR,
      CATEGORY_CATALOG_COPY.CATEGORY_COUNT_PLURAL
    ),
  ].join(STRING.SPACE);
