import { unstable_rethrow } from "next/navigation";
import type { StockCategoryReadResult } from "../models/StockCategoryReadResult.interface";
import { getStockCategory } from "./getStockCategory";

export const getStockCategoryResult = async (
  categoryId: string
): Promise<StockCategoryReadResult> => {
  try {
    return {
      category: await getStockCategory(categoryId),
      isReadFailed: false,
    };
  } catch (error) {
    unstable_rethrow(error);
    return { category: null, isReadFailed: true };
  }
};
