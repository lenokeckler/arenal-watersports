import type { StockFormValues } from "./StockFormValues.interface";

export type StockTextField = Exclude<
  keyof StockFormValues,
  "reason"
>;
