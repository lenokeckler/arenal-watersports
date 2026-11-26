import type { NullableRef } from "@/app/types";
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
import { resolveTariffEditPath } from "./resolveTariffEditPath";

const buildTariffLine = (
  tariffType: TariffType,
  amounts: NullableRef<TariffAmounts>
): TariffLineViewModel => {
  const hasTariff = hasTariffAmounts(amounts);

  return {
    amounts: formatTariffAmounts(amounts),
    hasTariff,
    label: TARIFF_TYPE_LABEL[tariffType],
    unit: hasTariff
      ? TARIFF_CATALOG_COPY.UNIT_PER_HOUR
      : null,
  };
};

export const buildTariffCardViewModel = (
  row: TariffCatalogRow
): TariffCardViewModel => {
  const lines = [
    buildTariffLine(TARIFF_TYPE.RENTAL, row.rental),
    buildTariffLine(TARIFF_TYPE.TOUR, row.tour),
  ];

  return {
    editHref: resolveTariffEditPath(row.categoryId),
    hasMissingTariff: lines.some(
      ({ hasTariff }) => !hasTariff
    ),
    id: row.categoryId,
    lines,
    name: row.categoryName,
  };
};
