export const RESERVATION_HISTORY_COPY = {
  ATTENDED_BY_LABEL: "Atendió",
  CANCELLED: "Cancelada",
  EMPTY_BODY:
    "Las reservas cerradas o canceladas aparecerán aquí.",
  EMPTY_TITLE: "Aún no hay reservas en el historial",
  EQUIPMENT_LABEL: "Equipo",
  GUIDE_LABEL: "Guía",
  LIST_ARIA_LABEL: "Lista de reservas del historial",
  METADATA_TITLE:
    "Historial de reservas — Arenal Water Sports",
  NO_EQUIPMENT: "Sin equipo",
  NO_GUIDE: "Sin guía",
  PAGE_DESCRIPTION:
    "Consulte las reservas ya cerradas o canceladas.",
  PAGE_TITLE: "Historial de reservas",
  ROW_ARIA_LABEL: (
    customerName: string,
    date: string
  ): string =>
    `Ver detalle de la reserva de ${customerName}, ${date}`,
} as const;
