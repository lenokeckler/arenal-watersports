import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_QUANTITY_FIELD } from "../constants/StockQuantityField.constants";
import type { StockFormErrors } from "../models/StockFormErrors.interface";
import type { StockFormValues } from "../models/StockFormValues.interface";
import { parseStockQuantity } from "./parseStockQuantity";

export const findStockQuantityFieldErrors = (
  values: StockFormValues
): StockFormErrors =>
  Object.values(
    STOCK_QUANTITY_FIELD
  ).reduce<StockFormErrors>(
    (errors, field) =>
      Number.isNaN(parseStockQuantity(values[field]))
        ? {
            ...errors,
            [field]:
              STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR,
          }
        : errors,
    {}
  );
