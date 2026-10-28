import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import type { LogoutPhase } from "../models/LogoutPhase.type";
import { LOGOUT_PHASE } from "./LogoutPhase.constants";

export const LOGOUT_BUTTON_ICON: Record<
  LogoutPhase,
  MaterialIconName
> = {
  [LOGOUT_PHASE.IDLE]: MATERIAL_ICON_NAME.LOGOUT,
  [LOGOUT_PHASE.CONFIRMING]: MATERIAL_ICON_NAME.LOGOUT,
  [LOGOUT_PHASE.PENDING]:
    MATERIAL_ICON_NAME.PROGRESS_ACTIVITY,
  [LOGOUT_PHASE.FAILED]: MATERIAL_ICON_NAME.LOGOUT,
};
