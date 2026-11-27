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
  compatibleUnitCount: readCompatibleUnitCount(
    extraRow.extra_compatibility
  ),
});
