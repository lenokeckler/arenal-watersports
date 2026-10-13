import { MATERIAL_ICON_NAME } from "../constants/MaterialIconName.constants";

export type MaterialIconName =
  (typeof MATERIAL_ICON_NAME)[keyof typeof MATERIAL_ICON_NAME];
