export const STOCK_MUTATION_STATUS = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type StockMutationStatus =
  (typeof STOCK_MUTATION_STATUS)[keyof typeof STOCK_MUTATION_STATUS];
