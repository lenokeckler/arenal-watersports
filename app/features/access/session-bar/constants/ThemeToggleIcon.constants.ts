import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { THEME } from "@/app/constants";

export const THEME_TOGGLE_ICON = {
  [THEME.DARK]: MATERIAL_ICON_NAME.DARK_MODE,
  [THEME.LIGHT]: MATERIAL_ICON_NAME.LIGHT_MODE,
} as const;
