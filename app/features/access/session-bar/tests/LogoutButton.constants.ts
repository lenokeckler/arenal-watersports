import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { LOGOUT_PHASE } from "../constants/LogoutPhase.constants";
import type { LogoutPhase } from "../models/LogoutPhase.type";

export const ARIA_DISABLED_ATTRIBUTE = "aria-disabled";
export const DISABLED_ATTRIBUTE = "disabled";
export const TYPE_ATTRIBUTE = "type";
export const BUTTON_TYPE = "button";
export const ARIA_DISABLED_TRUE = "true";
export const ARIA_DISABLED_FALSE = "false";
export const SPIN_CLASS = "animate-spin";
export const VOSEO_PATTERN =
  /(cerrá|confirmá|tocá|apretá|podés)/i;

export const EXPECTED_LABEL: Record<LogoutPhase, string> = {
  [LOGOUT_PHASE.IDLE]: "Cerrar sesión",
  [LOGOUT_PHASE.CONFIRMING]: "¿Confirmar cierre de sesión?",
  [LOGOUT_PHASE.PENDING]: "Cerrando sesión…",
  [LOGOUT_PHASE.FAILED]: "Cerrar sesión",
};

export const EXPECTED_ICON: Record<LogoutPhase, string> = {
  [LOGOUT_PHASE.IDLE]: MATERIAL_ICON_NAME.LOGOUT,
  [LOGOUT_PHASE.CONFIRMING]: MATERIAL_ICON_NAME.LOGOUT,
  [LOGOUT_PHASE.PENDING]:
    MATERIAL_ICON_NAME.PROGRESS_ACTIVITY,
  [LOGOUT_PHASE.FAILED]: MATERIAL_ICON_NAME.LOGOUT,
};

export const ALL_PHASES: readonly LogoutPhase[] =
  Object.values(LOGOUT_PHASE);

export const STATUS_MESSAGE = "Cerrando sesión…";
