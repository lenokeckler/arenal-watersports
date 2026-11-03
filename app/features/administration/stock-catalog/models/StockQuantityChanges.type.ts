import type { StockQuantityField } from "../constants/StockQuantityField.constants";

export type StockQuantityChanges = Record<
  StockQuantityField,
  string
>;
