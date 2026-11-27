export const CATEGORY_CONFIGURE_SAVE_COPY = {
  DIRTY_PLURAL: (count: number): string =>
    `${count} cambios sin guardar`,
  DIRTY_SINGULAR: "1 cambio sin guardar",
  FAILED:
    "No se guardó. Revise la señal y toque Reintentar. Sus cambios siguen aquí.",
  FIX_FIELDS_PLURAL: (count: number): string =>
    `Corrija ${count} campos para poder guardar.`,
  FIX_FIELDS_SINGULAR:
    "Corrija 1 campo para poder guardar.",
  SAVED: "Cambios guardados.",
  SAVING: "Guardando…",
} as const;
