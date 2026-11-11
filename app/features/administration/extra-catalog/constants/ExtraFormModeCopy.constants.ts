import { EXTRA_CATALOG_COPY } from "./ExtraCatalogCopy.constants";
import {
  EXTRA_FORM_MODE,
  type ExtraFormMode,
} from "./ExtraFormMode.constants";

export const EXTRA_FORM_TITLE: Record<
  ExtraFormMode,
  string
> = {
  [EXTRA_FORM_MODE.CREATE]:
    EXTRA_CATALOG_COPY.FORM_TITLE_CREATE,
  [EXTRA_FORM_MODE.EDIT]:
    EXTRA_CATALOG_COPY.FORM_TITLE_EDIT,
};

export const EXTRA_FORM_SUBMIT_LABEL: Record<
  ExtraFormMode,
  string
> = {
  [EXTRA_FORM_MODE.CREATE]:
    EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE,
  [EXTRA_FORM_MODE.EDIT]:
    EXTRA_CATALOG_COPY.SUBMIT_BUTTON_EDIT,
};

export const EXTRA_FORM_SUCCESS_TOAST: Record<
  ExtraFormMode,
  string
> = {
  [EXTRA_FORM_MODE.CREATE]:
    EXTRA_CATALOG_COPY.CREATE_SUCCESS_TOAST,
  [EXTRA_FORM_MODE.EDIT]:
    EXTRA_CATALOG_COPY.UPDATE_SUCCESS_TOAST,
};
