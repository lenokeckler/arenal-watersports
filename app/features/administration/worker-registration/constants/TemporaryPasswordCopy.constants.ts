import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";

export const TEMPORARY_PASSWORD_COPY_PHASE = {
  COPIED: "copied",
  FAILED: "failed",
  IDLE: "idle",
} as const;

export type TemporaryPasswordCopyPhase =
  (typeof TEMPORARY_PASSWORD_COPY_PHASE)[keyof typeof TEMPORARY_PASSWORD_COPY_PHASE];

export const TEMPORARY_PASSWORD_COPY_LABEL: Record<
  TemporaryPasswordCopyPhase,
  string
> = {
  [TEMPORARY_PASSWORD_COPY_PHASE.COPIED]: "Copiada",
  [TEMPORARY_PASSWORD_COPY_PHASE.FAILED]: "Copiar",
  [TEMPORARY_PASSWORD_COPY_PHASE.IDLE]: "Copiar",
};

export const TEMPORARY_PASSWORD_COPY_ICON: Record<
  TemporaryPasswordCopyPhase,
  MaterialIconName
> = {
  [TEMPORARY_PASSWORD_COPY_PHASE.COPIED]:
    MATERIAL_ICON_NAME.CHECK,
  [TEMPORARY_PASSWORD_COPY_PHASE.FAILED]:
    MATERIAL_ICON_NAME.CONTENT_COPY,
  [TEMPORARY_PASSWORD_COPY_PHASE.IDLE]:
    MATERIAL_ICON_NAME.CONTENT_COPY,
};

export const TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT: Record<
  TemporaryPasswordCopyPhase,
  string
> = {
  [TEMPORARY_PASSWORD_COPY_PHASE.COPIED]:
    "Contraseña temporal copiada.",
  [TEMPORARY_PASSWORD_COPY_PHASE.FAILED]:
    "No se pudo copiar. Selecciónela y cópiela a mano.",
  [TEMPORARY_PASSWORD_COPY_PHASE.IDLE]: "",
};
