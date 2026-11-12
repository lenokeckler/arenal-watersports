import type { NullableUndefined } from "@/app/types";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockAdjustmentContext } from "../models/StockAdjustmentContext.interface";
import { findStockExpiryError } from "./findStockExpiryError";
import { findStockQuantityError } from "./findStockQuantityError";
import { findStockReasonError } from "./findStockReasonError";
import { findStockUnchangedError } from "./findStockUnchangedError";

export const validateStockAdjustment = (
  input: AdjustStockInput,
  context: StockAdjustmentContext
): NullableUndefined<string> =>
  findStockQuantityError(input) ??
  findStockReasonError(input) ??
  findStockExpiryError(input, context.hasExpiryAlert) ??
  findStockUnchangedError(input, context.currentLevels);
