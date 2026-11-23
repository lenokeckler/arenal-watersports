export const CATEGORY_CONFIGURE_COPY = {
  ACTIVE_HELP:
    "Si la apaga, no aparece en el tablero ni en las reservas.",
  ACTIVE_LABEL: "Categoría activa",
  ALERTS_EXPIRY_DAY_PLURAL: "días",
  ALERTS_EXPIRY_DAY_SINGULAR: "día",
  ALERTS_EXPIRY_FIELD_LABEL:
    "Avisar estos días antes del vencimiento",
  ALERTS_EXPIRY_PREFIX: "Vencimiento:",
  ALERTS_NONE: "No avisa",
  ALERTS_QUANTITY_FIELD_LABEL: "Avisar cuando queden",
  ALERTS_QUANTITY_PREFIX: "Pocas existencias:",
  ALERTS_TYPE_EXPIRY: "Por vencimiento",
  ALERTS_TYPE_LABEL: "¿Cuándo avisar?",
  ALERTS_TYPE_NONE: "No avisar",
  ALERTS_TYPE_QUANTITY: "Pocas existencias",
  BACK: "Regresar",
  BADGE_MISSING: "Falta",
  BADGE_OPTIONAL: "Opcional",
  BOOKABLE_HELP:
    "Si lo apaga, no aparece en el tablero. Úselo para equipo interno, como chalecos o botiquines.",
  BOOKABLE_LABEL: "Se puede reservar",
  DELETE_ALTERNATIVE:
    "¿Solo quiere que deje de verse? Desactívela: no aparece en el tablero ni en las reservas y conserva su historial.",
  DELETE_BODY:
    "Se borrará la categoría, sus unidades y su historial de conteo. Esta acción no se puede deshacer.",
  DELETE_CONFIRM: (name: string): string =>
    `Sí, eliminar ${name}`,
  DELETE_DEACTIVATE: "Desactivar en su lugar",
  DELETE_TITLE: (name: string): string =>
    `¿Eliminar ${name}?`,
  DEPOSIT_HELP:
    "Deje vacío lo que no aplique. Cada monto se cobra en su moneda; no se convierte.",
  DEPOSIT_NONE: "Sin depósito",
  DEPOSIT_WITHOUT_CRC: "sin colones",
  DEPOSIT_WITHOUT_USD: "sin dólares",
  DURATION_HELP: "Se puede cambiar en cada reserva.",
  DURATION_LABEL: "Duración estándar del alquiler",
  DURATION_OTHER: "Otra",
  DURATION_UNIT: "min",
  GUIDE_ONLY_HELP:
    "Se reserva únicamente dentro de un tour con guía; no se alquila sola.",
  GUIDE_ONLY_LABEL: "Solo con guía",
  INVENTORY_REGISTER_STOCK: "Registrar existencias",
  INVENTORY_VIEW_UNITS: "Ver unidades",
  MISSING_DURATION: "duración",
  MISSING_PHOTO: "foto (opcional)",
  MISSING_PREFIX: "Falta:",
  MISSING_STOCK: "existencias",
  MODE_LOCKED:
    "El modo de conteo no se puede cambiar después de crear la categoría.",
  PHOTO_EMPTY:
    "Sin foto. En el tablero se muestra este marcador.",
  PHOTO_HELP:
    "JPG, PNG o WebP. En el tablero se ve recortada como en esta vista previa.",
  PHOTO_MISSING: "Sin foto · se usa el marcador",
  PHOTO_PICK: "Tomar o elegir foto",
  PHOTO_PICKED: "Foto nueva",
  PHOTO_PRESENT: "Con foto",
  RESERVABLE: "Reservable",
  RESERVATIONS_NOT_RESERVABLE: "No reservable",
  SECTION_ALERTS: "Avisos",
  SECTION_DEPOSIT: "Depósito de garantía",
  SECTION_INVENTORY_BY_QUANTITY: "Existencias",
  SECTION_INVENTORY_BY_UNIT: "Unidades",
  SECTION_PHOTO: "Foto para el tablero",
  SECTION_RESERVATIONS: "Reservas",
  SECTION_TRAITS: "Características del equipo",
  STATUS_GUIDE_ONLY: "Solo con guía",
  STATUS_INACTIVE: "Inactiva",
  STATUS_INACTIVE_DETAIL:
    "No aparece en el tablero ni en las reservas.",
  STATUS_INVENTORY_ONLY: "Solo inventario",
  STATUS_INVENTORY_ONLY_DETAIL:
    "No aparece en el tablero. Solo se lleva el conteo.",
  STATUS_ON_BOARD: "En el tablero",
  STATUS_ON_BOARD_DETAIL:
    "Aparece en el tablero y se puede reservar.",
  TITLE: "Configurar categoría",
  TRAIT_CAN_BE_DAMAGED: "puede dañarse",
  TRAIT_CONSUMES_FUEL: "combustible",
  TRAIT_HAS_CONDITION_PHOTOS: "fotos de estado",
  TRAIT_HAS_MOTOR: "Con motor",
  TRAITS_NONE: "Sin características",
} as const;
