import { RESERVATION_TYPE } from "@/app/constants";
import type {
  NullableRef,
  ReservationType,
} from "@/app/types";
import type { PriceLookupAmounts } from "../models/PriceLookupAmounts.interface";
import type { PriceLookupTariff } from "../models/PriceLookupTariff.interface";
import type { PriceLookupTariffRow } from "../models/PriceLookupTariffRow.type";

const findAmounts = (
  row: PriceLookupTariffRow,
  type: ReservationType
): NullableRef<PriceLookupAmounts> => {
  const tariff = row.tariffs.find(
    (candidate) => candidate.type === type
  );
  return tariff
    ? { crc: tariff.amount_crc, usd: tariff.amount_usd }
    : null;
};

export const mapPriceLookupTariffRow = (
  row: PriceLookupTariffRow
): PriceLookupTariff => ({
  categoryId: row.id,
  categoryName: row.name,
  rental: findAmounts(row, RESERVATION_TYPE.RENTAL),
  tour: findAmounts(row, RESERVATION_TYPE.TOUR),
});
