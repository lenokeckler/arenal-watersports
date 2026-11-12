import { PostgrestError } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_DATABASE_MESSAGE } from "../constants/StockDatabaseMessage.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import { mapStockWriteErrorToResult } from "../utils/mapStockWriteErrorToResult";

const buildError = (
  code: string,
  message: string
): PostgrestError =>
  new PostgrestError({
    code,
    details: "",
    hint: "",
    message,
  });

describe("mapStockWriteErrorToResult", () => {
  it("returns null when there is no error", () => {
    expect(mapStockWriteErrorToResult(null)).toBeNull();
  });

  it.each([
    [
      POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE,
      STOCK_CATALOG_COPY.NOT_AUTHORIZED_ERROR,
    ],
    [
      POSTGRES_ERROR_CODE.NO_DATA_FOUND,
      STOCK_CATALOG_COPY.CATEGORY_NOT_FOUND_ERROR,
    ],
  ])("maps the code %s to Spanish copy", (code, copy) => {
    expect(
      mapStockWriteErrorToResult(buildError(code, "any"))
    ).toEqual({
      message: copy,
      status: STOCK_MUTATION_STATUS.ERROR,
    });
  });

  it.each([
    [
      STOCK_DATABASE_MESSAGE.ALREADY_COUNTED,
      STOCK_CATALOG_COPY.ALREADY_COUNTED_ERROR,
    ],
    [
      STOCK_DATABASE_MESSAGE.REMOVAL_MUST_LOWER_TOTAL,
      STOCK_CATALOG_COPY.REMOVAL_MUST_LOWER_TOTAL_ERROR,
    ],
    [
      STOCK_DATABASE_MESSAGE.NO_CHANGE,
      STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR,
    ],
    [
      STOCK_DATABASE_MESSAGE.NEGATIVE_QUANTITY,
      STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR,
    ],
  ])(
    "maps the rejected parameter %s to Spanish copy",
    (message, copy) => {
      expect(
        mapStockWriteErrorToResult(
          buildError(
            POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE,
            message
          )
        )
      ).toEqual({
        message: copy,
        status: STOCK_MUTATION_STATUS.ERROR,
      });
    }
  );

  it("leaves unknown errors for the caller to throw", () => {
    expect(
      mapStockWriteErrorToResult(
        buildError(
          POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE,
          "unexpected"
        )
      )
    ).toBeNull();
    expect(
      mapStockWriteErrorToResult(buildError("500", "boom"))
    ).toBeNull();
  });
});
