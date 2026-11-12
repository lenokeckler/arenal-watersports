export const EQUIPMENT_HOURS_COPY = {
  EMPTY: "Todavía no hay equipos para mostrar.",
  ERROR:
    "No se pudieron cargar las horas de uso. Intente de nuevo.",
  HEADING: "Horas de uso por equipo",
  PAGINATION_LABEL: "Paginación de las categorías",
  INTRO:
    "Las horas que cada equipo estuvo despachado en los últimos 12 meses, de las salidas ya cerradas. Los que casi no salen quedan al final de cada categoría.",
  NO_USE: "Sin salidas",
  ROW_VALUE: (hours: string, dispatches: number) =>
    `${hours} h · ${dispatches} ${dispatches === 1 ? "salida" : "salidas"}`,
  LAST_DISPATCH: (date: string) => `Última salida: ${date}`,
} as const;
