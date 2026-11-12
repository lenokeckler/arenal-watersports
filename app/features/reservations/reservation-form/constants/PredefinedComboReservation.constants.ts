export const PREDEFINED_COMBO_RESERVATION = {
  UUID_PATTERN:
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

export const PREDEFINED_COMBO_RESERVATION_COPY = {
  COMBO_ID: "Seleccione un combo predefinido válido.",
} as const;
