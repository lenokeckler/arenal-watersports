import type { Metadata } from "next";
import { TARIFF_CATALOG_COPY } from "./TariffCatalogCopy.constants";
import { TARIFF_FORM_COPY } from "./TariffFormCopy.constants";

export const TARIFF_LIST_METADATA: Metadata = {
  title: TARIFF_CATALOG_COPY.LIST_TITLE,
};

export const TARIFF_EDIT_METADATA: Metadata = {
  title: TARIFF_FORM_COPY.TITLE_EDIT,
};
