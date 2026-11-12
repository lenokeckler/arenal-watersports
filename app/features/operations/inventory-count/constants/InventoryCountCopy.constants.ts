import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import {
  INVENTORY_COUNT_QUANTITY_FIELD,
  INVENTORY_COUNT_RESULT,
  type InventoryCountQuantityField,
  type InventoryCountResult,
  type InventoryCountUnitStatus,
} from "./InventoryCount.constants";

export const INVENTORY_COUNT_COPY = {
  BACK: "Volver a las categorías",
  CATEGORIES_LABEL: "Categorías del conteo",
  CATEGORY_DONE: "Confirmada",
  CATEGORY_PENDING: "Pendiente",
  CATEGORY_QUANTITY: "Por cantidad",
  CATEGORY_UNITS: (total: number) =>
    `${total} ${total === 1 ? "unidad" : "unidades"}`,
  CONFIRM_CATEGORY: "Confirmar categoría",
  EMPTY: "No hay inventario para contar.",
  ERROR_LOAD:
    "No se pudo cargar el inventario. Intente de nuevo.",
  FORBIDDEN:
    "Solo operaciones o administración levantan un conteo.",
  HEADING: "Levantar conteo",
  INTRO:
    "Revise cada categoría. Si todo coincide con el sistema, confírmela con un toque; si no, corrija lo que haga falta.",
  MATCH_ALL: "Todo coincide",
  NOTES_LABEL: "Notas del conteo",
  PENDING_HINT: (pending: number) =>
    `Faltan ${pending} ${pending === 1 ? "categoría" : "categorías"} por confirmar.`,
  PROGRESS: (done: number, total: number) =>
    `${done} de ${total} categorías confirmadas`,
  READY_HINT: "Todas las categorías están confirmadas.",
  SUBMIT: "Registrar conteo",
  SUBMITTING: "Registrando conteo",
  SYSTEM_STATUS: (status: string) => `Sistema: ${status}`,
  SYSTEM_SUMMARY: (
    available: number,
    damaged: number,
    inRepair: number
  ) =>
    `El sistema tiene ${available} disponibles, ${damaged} dañadas y ${inRepair} en reparación.`,
} as const;

export const INVENTORY_COUNT_UNIT_STATUS_COPY: Record<
  InventoryCountUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: "Disponible",
  [INVENTORY_UNIT_STATUS.DAMAGED]: "Dañada",
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    "En mantenimiento",
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: "En reparación",
};

export const INVENTORY_COUNT_QUANTITY_LABEL: Record<
  InventoryCountQuantityField,
  string
> = {
  [INVENTORY_COUNT_QUANTITY_FIELD.AVAILABLE]: "Disponibles",
  [INVENTORY_COUNT_QUANTITY_FIELD.DAMAGED]: "Dañadas",
  [INVENTORY_COUNT_QUANTITY_FIELD.IN_REPAIR]:
    "En reparación",
};

export const INVENTORY_COUNT_MESSAGE: Record<
  InventoryCountResult,
  string
> = {
  [INVENTORY_COUNT_RESULT.FAILED]:
    "No se pudo registrar el conteo. Intente de nuevo.",
  [INVENTORY_COUNT_RESULT.INCOMPLETE]:
    "El inventario cambió mientras contaba. Recargue la pantalla y cuente de nuevo.",
  [INVENTORY_COUNT_RESULT.INVALID]:
    "Revise el conteo: cada cantidad es un número entero de cero en adelante.",
  [INVENTORY_COUNT_RESULT.NOT_ALLOWED]:
    "Solo operaciones o administración levantan un conteo.",
  [INVENTORY_COUNT_RESULT.RECORDED]:
    "Conteo registrado. Quedó guardado con la fecha de hoy y su nombre.",
};

export const INVENTORY_COUNT_QUANTITY_ERROR =
  "Escriba un número entero de cero en adelante.";
