import type { CategoryConfigureNextStepCopy } from "../models/CategoryConfigureNextStepCopy.interface";
import type { CategoryConfigureNextStepId } from "../models/CategoryConfigureNextStepId.type";
import { CATEGORY_CONFIGURE_COPY } from "./CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "./CategoryConfigureNextStepId.constants";

export const CATEGORY_CONFIGURE_NEXT_STEPS_COPY = {
  ACTION_LABEL: (action: string, title: string): string =>
    `${action} ${title}`,
  BODY_INTERNAL: (name: string): string =>
    `${name} es de uso interno. Complete esto para llevar su conteo.`,
  BODY_RESERVABLE: (name: string): string =>
    `${name} ya está activa y es reservable. Complete esto para que se pueda reservar sin problemas.`,
  PROGRESS: (doneCount: number, total: number): string =>
    `${doneCount} de ${total} listos`,
  TITLE: "Siguientes pasos",
} as const;

export const CATEGORY_CONFIGURE_NEXT_STEP_COPY: Record<
  CategoryConfigureNextStepId,
  CategoryConfigureNextStepCopy
> = {
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.DEPOSIT]: {
    action: "Definir",
    help: "Solo si se cobra depósito.",
    title: CATEGORY_CONFIGURE_COPY.SECTION_DEPOSIT,
  },
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.DURATION]: {
    action: "Definir",
    help: "Lo que dura un alquiler normal.",
    title: "Duración estándar",
  },
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.PHOTO]: {
    action: "Agregar",
    help: "Sin foto se muestra un marcador.",
    title: CATEGORY_CONFIGURE_COPY.SECTION_PHOTO,
  },
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.STOCK]: {
    action: "Registrar",
    help: "Diga cuántos hay.",
    title:
      CATEGORY_CONFIGURE_COPY.SECTION_INVENTORY_BY_QUANTITY,
  },
};
