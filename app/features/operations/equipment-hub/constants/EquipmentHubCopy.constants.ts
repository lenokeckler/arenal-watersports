export const EQUIPMENT_HUB_COPY = {
  CARDS: {
    damages: "Daños",
    maintenance: "Mantenimiento",
    photos: "Fotos del estado",
  },
  CAUSE_HEADING: "Daños por causa",
  CAUSE_PERIOD: "Últimos 6 meses",
  CURRENCY_LABEL: "Moneda",
  DAMAGE_PENDING: (count: number): string =>
    count === 0
      ? "Nada por completar"
      : `${count} por completar`,
  DESCRIPTION:
    "Daños, fotos y mantenimiento de las máquinas.",
  ERROR: "No se pudo cargar la información del equipo.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Equipo",
  MAINTENANCE_WAITING: (count: number): string =>
    count === 0
      ? "Nada pendiente"
      : count === 1
        ? "1 máquina pendiente"
        : `${count} máquinas pendientes`,
  PHOTOS_MISSING: (count: number): string =>
    count === 0
      ? "Fotos al día"
      : count === 1
        ? "1 máquina con fotos por completar"
        : `${count} máquinas con fotos por completar`,
  SEE_DAMAGE: "Ver daños",
  SEE_SUMMARY: "Ver resumen",
  SPEND_HEADING: "Gasto en mantenimiento",
} as const;
