import type { TariffType } from "../models/TariffType.type";
import { TARIFF_CATALOG_COPY } from "./TariffCatalogCopy.constants";
import { TARIFF_TYPE } from "./TariffType.constants";

export const TARIFF_TYPE_LABEL: Record<TariffType, string> =
  {
    [TARIFF_TYPE.RENTAL]:
      TARIFF_CATALOG_COPY.TYPE_LABEL_RENTAL,
    [TARIFF_TYPE.TOUR]: TARIFF_CATALOG_COPY.TYPE_LABEL_TOUR,
  };
