import type { Metadata } from "next";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { CATEGORY_IMAGE_COPY } from "./CategoryImageCopy.constants";

export const CATEGORY_LIST_METADATA: Metadata = {
  title: CATEGORY_CATALOG_COPY.LIST_TITLE,
};

export const CATEGORY_CREATE_FORM_METADATA: Metadata = {
  title: CATEGORY_CATALOG_COPY.CREATE_FORM_TITLE,
};

export const CATEGORY_BEHAVIOR_FORM_METADATA: Metadata = {
  title: CATEGORY_CATALOG_COPY.BEHAVIOR_FORM_TITLE,
};

export const CATEGORY_DEPOSIT_FORM_METADATA: Metadata = {
  title: CATEGORY_CATALOG_COPY.DEPOSIT_FORM_TITLE,
};

export const CATEGORY_ALERT_FORM_METADATA: Metadata = {
  title: CATEGORY_CATALOG_COPY.ALERT_FORM_TITLE,
};

export const CATEGORY_IMAGE_FORM_METADATA: Metadata = {
  title: CATEGORY_IMAGE_COPY.FORM_TITLE,
};
