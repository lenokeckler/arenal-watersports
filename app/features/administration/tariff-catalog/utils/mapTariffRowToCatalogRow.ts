import { TARIFF_TYPE } from "../constants/TariffType.constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";
import type { TariffCatalogRow } from "../models/TariffCatalogRow.interface";
import type { TariffRow } from "../models/TariffRow.type";
import type { TariffType } from "../models/TariffType.type";
import type { NullableRef } from "@/app/types";

const findAmounts = (
  row: TariffRow,
  tariffType: TariffType
): NullableRef<TariffAmounts> => {
  const tariff = row.tariffs.find(
    (candidate) => candidate.type === tariffType
  );
  return tariff
    ? { crc: tariff.amount_crc, usd: tariff.amount_usd }
    : null;
};

export const mapTariffRowToCatalogRow = (
  row: TariffRow
): TariffCatalogRow => ({
  categoryId: row.id,
  categoryName: row.name,
  rental: findAmounts(row, TARIFF_TYPE.RENTAL),
  tour: findAmounts(row, TARIFF_TYPE.TOUR),
});
