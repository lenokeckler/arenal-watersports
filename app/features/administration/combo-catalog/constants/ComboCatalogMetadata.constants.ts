import type { Metadata } from "next";
import { COMBO_CATALOG_COPY } from "./ComboCatalogCopy.constants";
import { COMBO_FORM_COPY } from "./ComboFormCopy.constants";

export const COMBO_LIST_METADATA: Metadata = {
  title: COMBO_CATALOG_COPY.LIST_TITLE,
};

export const COMBO_CREATE_METADATA: Metadata = {
  title: COMBO_FORM_COPY.TITLE_CREATE,
};

export const COMBO_EDIT_METADATA: Metadata = {
  title: COMBO_FORM_COPY.TITLE_EDIT,
};
