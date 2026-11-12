import { describe, expect, it } from "vitest";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { validateStockFormValues } from "../utils/validateStockFormValues";
import {
  DEFAULT_STOCK_ADJUSTMENT_CONTEXT,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  buildStockFormValues,
  INVALID_QUANTITY_TEXT,
  TYPED_AVAILABLE,
} from "./StockCount.constants";

const validate = (
  overrides: Parameters<typeof buildStockFormValues>[0]
) =>
  validateStockFormValues(
    buildStockFormValues(overrides),
    FAKE_STOCK_CATEGORY_ID,
    DEFAULT_STOCK_ADJUSTMENT_CONTEXT
  );

describe("validateStockFormValues", () => {
  it("accepts a changed count", () => {
    expect(
      validate({ available: TYPED_AVAILABLE })
    ).toEqual({});
  });

  it("marks every quantity that is not a whole number", () => {
    expect(
      validate({
        available: INVALID_QUANTITY_TEXT,
        inRepair: INVALID_QUANTITY_TEXT,
      })
    ).toEqual({
      available: STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR,
      inRepair: STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR,
    });
  });

  it("puts a rule of the adjustment on the form", () => {
    expect(validate({})).toEqual({
      form: STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR,
    });
  });
});
