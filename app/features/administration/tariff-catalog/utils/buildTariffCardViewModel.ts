import type { NullableRef } from "@/app/types";
import { TARIFF_CARD_TONE } from "../constants/TariffCardTone.constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import { TARIFF_TYPE_LABEL } from "../constants/TariffTypeLabel.constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import type { TariffCatalogRow } from "../models/TariffCatalogRow.interface";
import type { TariffLineViewModel } from "../models/TariffLineViewModel.interface";
import type { TariffType } from "../models/TariffType.type";
import { formatTariffAmounts } from "./formatTariffAmounts";
import { hasTariffAmounts } from "./hasTariffAmounts";

const buildTariffLine = (
  tariffType: TariffType,
  amounts: NullableRef<TariffAmounts>
): TariffLineViewModel => ({
  amounts: formatTariffAmounts(amounts),
  label: TARIFF_TYPE_LABEL[tariffType],
  unit: hasTariffAmounts(amounts)
    ? TARIFF_CATALOG_COPY.UNIT_PER_HOUR
    : null,
});

export const buildTariffCardViewModel = (
  row: TariffCatalogRow
): TariffCardViewModel => ({
  id: row.categoryId,
  lines: [
    buildTariffLine(TARIFF_TYPE.RENTAL, row.rental),
    buildTariffLine(TARIFF_TYPE.TOUR, row.tour),
  ],
  name: row.categoryName,
  tone:
    hasTariffAmounts(row.rental) ||
    hasTariffAmounts(row.tour)
      ? TARIFF_CARD_TONE.STANDARD
      : TARIFF_CARD_TONE.MUTED,
});
