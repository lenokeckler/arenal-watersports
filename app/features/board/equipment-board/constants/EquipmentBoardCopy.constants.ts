import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import type { NullableRef } from "@/app/types";

export const EQUIPMENT_BOARD_COPY = {
  DRAG_HINT:
    "Mantenga presionada una tarjeta y arrástrela para cambiar el orden.",
  EMPTY_BODY:
    "Cuando administración active una categoría reservable, aparecerá aquí con su equipo.",
  EMPTY_TITLE: "No hay equipo reservable que mostrar",
  ERROR_BODY:
    "Revise su conexión e intente de nuevo. Mientras no cargue, no asuma que hay equipo libre.",
  ERROR_TITLE: "No se pudo cargar el tablero",
  FILTERED_COUNT: (count: number, label: string): string =>
    `${count} ${label}`,
  FILTERED_LABELS: {
    available: {
      PLURAL: "disponibles",
      SINGULAR: "disponible",
    },
    damaged: { PLURAL: "dañadas", SINGULAR: "dañada" },
    maintenance: {
      PLURAL: "en mantenimiento",
      SINGULAR: "en mantenimiento",
    },
  },
  FREE_LABEL_PLURAL: "libres",
  FREE_LABEL_SINGULAR: "libre",
  FREE_OF_TOTAL: (
    free: number,
    total: number,
    freeLabel: string
  ): string => `${free} / ${total} ${freeLabel}`,
  FILTERED_EMPTY: "Ninguna",
  GRID_LABEL: "Categorías de equipo reservable",
  LOADING_ANNOUNCEMENT: "Cargando el tablero de equipo.",
  METADATA_TITLE: "Tablero — Arenal Water Sports",
  PAGE_DESCRIPTION:
    "Qué se puede alquilar en este momento.",
  PAGE_TITLE: "Tablero",
  PENDING_DISPATCH_COUNT: (count: number): string =>
    count > DISPATCH_BOARD_PAGINATION.PAGE_SIZE
      ? `${DISPATCH_BOARD_PAGINATION.PAGE_SIZE}+`
      : String(count),
  PENDING_DISPATCH_LABEL: (
    count: NullableRef<number>
  ): string =>
    count === null
      ? "Pendientes de hoy: reservas por despachar"
      : `Pendientes de hoy: ${count} ${count === 1 ? "reserva" : "reservas"} por despachar`,
  PENDING_DISPATCH_TITLE: "Pendientes de hoy",
  RETRY: "Reintentar",
} as const;
