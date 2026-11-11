import type { Metadata } from "next";
import { EXTRA_CATALOG_COPY } from "./ExtraCatalogCopy.constants";
import { EXTRA_FORM_MODE } from "./ExtraFormMode.constants";
import { EXTRA_FORM_TITLE } from "./ExtraFormModeCopy.constants";

export const EXTRA_LIST_METADATA: Metadata = {
  title: EXTRA_CATALOG_COPY.LIST_TITLE,
};

export const EXTRA_CREATE_METADATA: Metadata = {
  title: EXTRA_FORM_TITLE[EXTRA_FORM_MODE.CREATE],
};

export const EXTRA_EDIT_METADATA: Metadata = {
  title: EXTRA_FORM_TITLE[EXTRA_FORM_MODE.EDIT],
};
