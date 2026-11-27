import type { PriceLookupExtra } from "../models/PriceLookupExtra.interface";
import type { PriceLookupExtraRow } from "../models/PriceLookupExtraRow.type";

export const mapPriceLookupExtraRow = (
  row: PriceLookupExtraRow
): PriceLookupExtra => ({
  amounts: { crc: row.price_crc, usd: row.price_usd },
  id: row.id,
  name: row.name,
});
