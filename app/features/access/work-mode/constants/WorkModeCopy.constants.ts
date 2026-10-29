import {
  SUPABASE_WORK_AREA,
  WORK_MODE_RESULT,
  type WorkModeResult,
} from "@/app/constants";
import type { WorkArea } from "@/app/types";

export const WORK_MODE_COPY = {
  CURRENT: "Modo actual",
  HEADING: "¿Con qué área va a trabajar?",
  INSTRUCTION:
    "Su cuenta tiene más de un área. Elija una; puede cambiarla cuando quiera desde la barra de arriba, sin cerrar sesión.",
  METADATA_TITLE: "Modo de trabajo — Arenal Water Sports",
  SWITCH: "Cambiar",
  SWITCH_NAVIGATION: "Modo de trabajo",
  SWITCH_LABEL: (areaLabel: string): string =>
    `Modo: ${areaLabel}`,
} as const;

export const WORK_MODE_AREA_DESCRIPTION: Record<
  WorkArea,
  string
> = {
  [SUPABASE_WORK_AREA.ADMINISTRATION]:
    "Cuentas, catálogo y reportes.",
  [SUPABASE_WORK_AREA.OPERATIONS]:
    "Despacho y recepción de equipo en la playa.",
  [SUPABASE_WORK_AREA.RESERVATIONS]:
    "Agenda, clientes y cobros.",
};

export const WORK_MODE_ERROR: Record<
  WorkModeResult,
  string
> = {
  [WORK_MODE_RESULT.CHOSEN]: "",
  [WORK_MODE_RESULT.FAILED]:
    "No se pudo elegir el modo. Intente de nuevo.",
  [WORK_MODE_RESULT.NOT_ALLOWED]:
    "No se pudo elegir el modo. Vuelva a ingresar.",
  [WORK_MODE_RESULT.NOT_ENABLED]:
    "Esa área ya no está habilitada en su cuenta.",
};
