import { UNIT_CATALOG_COPY } from "./UnitCatalogCopy.constants";
import {
  UNIT_FORM_MODE,
  type UnitFormMode,
} from "./UnitFormMode.constants";

export const UNIT_FORM_SUCCESS_TOAST: Record<
  UnitFormMode,
  string
> = {
  [UNIT_FORM_MODE.CREATE]:
    UNIT_CATALOG_COPY.CREATE_SUCCESS_TOAST,
  [UNIT_FORM_MODE.EDIT]:
    UNIT_CATALOG_COPY.UPDATE_SUCCESS_TOAST,
};

export const UNIT_FORM_TITLE: Record<UnitFormMode, string> =
  {
    [UNIT_FORM_MODE.CREATE]: "Agregar unidad",
    [UNIT_FORM_MODE.EDIT]: "Editar unidad",
  };

export const UNIT_FORM_SUBMIT_LABEL: Record<
  UnitFormMode,
  string
> = {
  [UNIT_FORM_MODE.CREATE]: "Agregar unidad",
  [UNIT_FORM_MODE.EDIT]: "Guardar cambios",
};
