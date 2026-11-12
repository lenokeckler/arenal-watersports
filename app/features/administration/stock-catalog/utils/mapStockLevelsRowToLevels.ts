import type { StockLevels } from "../models/StockLevels.interface";
import type { StockLevelsRow } from "../models/StockLevelsRow.type";

export const mapStockLevelsRowToLevels = (
  levelsRow: StockLevelsRow
): StockLevels => ({
  available: levelsRow.quantity_available,
  damaged: levelsRow.quantity_damaged,
  expiryDate: levelsRow.expiry_date,
  inRepair: levelsRow.quantity_in_repair,
});
