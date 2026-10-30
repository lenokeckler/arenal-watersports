import { UNIT_CATEGORY_TRACKING_MODE } from "../constants/UnitCategoryTrackingMode.constants";
import { UNIT_FORM_COPY } from "../constants/UnitFormCopy.constants";
import {
  UNIT_FORM_MODE,
  type UnitFormMode,
} from "../constants/UnitFormMode.constants";
import type { Unit } from "../models/Unit.interface";
import type { UnitFormViewProps } from "../models/UnitFormViewProps.interface";
import { DEFAULT_UNIT } from "./Unit.constants";
import { buildUnitCategory } from "./UnitList.constants";

export const MOTORLESS_UNIT_CATEGORY = buildUnitCategory({
  hasMotor: false,
  usageMetric: null,
});
export const BY_QUANTITY_UNIT_CATEGORY = buildUnitCategory({
  trackingMode: UNIT_CATEGORY_TRACKING_MODE.BY_QUANTITY,
});
export const OTHER_CATEGORY_UNIT: Unit = {
  ...DEFAULT_UNIT,
  categoryId: "fake-other-category-id",
};

export const FORM_SUBMIT_LABEL: Record<
  UnitFormMode,
  string
> = {
  [UNIT_FORM_MODE.CREATE]: "Agregar unidad",
  [UNIT_FORM_MODE.EDIT]: "Guardar cambios",
};
export const STATUS_OPTION_LABELS = [
  "Disponible",
  "Dañada",
  "En mantenimiento",
  "En reparación",
];
export const BASE_FIELD_LABELS = [
  UNIT_FORM_COPY.CODE_LABEL,
  UNIT_FORM_COPY.STATUS_LABEL,
  UNIT_FORM_COPY.FUEL_MAX_LABEL,
];
export const motorFieldLabels = (usageLabel: string) => [
  UNIT_FORM_COPY.FUEL_LEVEL_LABEL,
  usageLabel,
  UNIT_FORM_COPY.NEXT_OIL_CHANGE_LABEL,
];
export const buildUnitFormViewProps = (
  overrides: Partial<UnitFormViewProps> = {}
): UnitFormViewProps => ({
  mode: UNIT_FORM_MODE.CREATE,
  category: buildUnitCategory(),
  ...overrides,
});
export const EDIT_UNIT_FORM_VIEW_PROPS =
  buildUnitFormViewProps({
    mode: UNIT_FORM_MODE.EDIT,
    unit: DEFAULT_UNIT,
  });

export const CREATE_DEFAULT_FUEL_MAX = 4;
export const TYPED_CODE = "JET-77";
export const TYPED_FUEL_LEVEL = 3;
export const TYPED_USAGE = 120.5;
export const TYPED_OIL = 300;
export const EXPECTED_CATEGORY_UNITS_PATH =
  "/administration/categories/fake-category-id/units";
export const TYPED_DECOMMISSION_REASON = "Casco partido";
