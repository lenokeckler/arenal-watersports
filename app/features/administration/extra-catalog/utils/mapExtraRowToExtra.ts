import type { Extra } from "../models/Extra.interface";
import type { ExtraRow } from "../models/ExtraRow.type";
import { readCompatibleUnitCount } from "./readCompatibleUnitCount";

export const mapExtraRowToExtra = (
  extraRow: ExtraRow
): Extra => ({
  id: extraRow.id,
  name: extraRow.name,
  status: extraRow.status,
  priceUsd: extraRow.price_usd,
  priceCrc: extraRow.price_crc,
  occupiesCategoryId: extraRow.occupies_category_id,
  occupiesQuantity: extraRow.occupies_quantity,
  occupiedCategoryName:
    extraRow.occupied_category?.name ?? null,
  compatibleUnitCount: readCompatibleUnitCount(
    extraRow.extra_compatibility
  ),
});
