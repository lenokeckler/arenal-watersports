import type { CategoryCreateFormChoice } from "../models/CategoryCreateFormChoice.interface";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";
import { CATEGORY_RESERVABLE_CHOICE } from "./CategoryReservableChoice.constants";
import { CATEGORY_TRACKING_MODE } from "./CategoryTrackingMode.constants";

export const CATEGORY_CREATE_MODE_CHOICES: CategoryCreateFormChoice[] =
  [
    {
      value: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      label:
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL,
      help: CATEGORY_CATALOG_COPY.CREATE_MODE_QUANTITY_HELP,
    },
    {
      value: CATEGORY_TRACKING_MODE.BY_UNIT,
      label:
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL,
      help: CATEGORY_CATALOG_COPY.CREATE_MODE_UNIT_HELP,
    },
  ];

export const CATEGORY_CREATE_RESERVABLE_CHOICES: CategoryCreateFormChoice[] =
  [
    {
      value: CATEGORY_RESERVABLE_CHOICE.YES,
      label: CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_YES,
    },
    {
      value: CATEGORY_RESERVABLE_CHOICE.NO,
      label: CATEGORY_CATALOG_COPY.CREATE_RESERVABLE_NO,
    },
  ];
