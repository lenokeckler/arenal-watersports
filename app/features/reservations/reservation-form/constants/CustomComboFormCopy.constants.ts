export const CUSTOM_COMBO_FORM_COPY = {
  TITLE: "Arme el combo",
  DESCRIPTION:
    "Elija las categorías, cantidades y unidades que necesita para esta solicitud.",
  ADD: "Agregar",
  REMOVE_ITEM: "Quitar del combo",
  DECREASE: "Disminuir cantidad de",
  INCREASE: "Aumentar cantidad de",
  NO_CATEGORIES:
    "No hay equipos disponibles para armar el combo.",
  MISSING_RENTAL_TARIFF:
    "No hay una tarifa de alquiler para este equipo; no se puede agregar al combo.",
  MISSING_TOUR_TARIFF:
    "No hay una tarifa de Tour para este equipo; no se puede agregar al combo.",
  NO_ITEMS: "Agregue al menos un equipo al combo.",
  PRICING_TITLE: "Precio propuesto",
  PRICING_LOADING: "Calculando precio sugerido…",
  PRICING_ERROR:
    "No fue posible calcular el precio sugerido.",
  PRICING_READY_EMPTY:
    "No hay una tarifa registrada para esta selección.",
  RETRY_PRICING: "Reintentar cálculo",
  CRC_AMOUNT: "Monto acordado en colones",
  USD_AMOUNT: "Monto acordado en dólares",
  AGREED_AMOUNT_HINT:
    "Puede ajustar cada moneda de forma independiente.",
  INVALID_AGREED_AMOUNT:
    "Ingrese un monto igual o mayor que cero.",
  NO_GUIDE: "Sin guía",
  QUANTITY: "Cantidad",
  TOUR_BADGE: "Tour",
  DECREMENT_SYMBOL: "-",
  INCREMENT_SYMBOL: "+",
} as const;

export const CUSTOM_COMBO_FORM_CURRENCY = {
  CRC: "CRC",
  USD: "USD",
  LOCALE: "es-CR",
} as const;

export const CUSTOM_COMBO_FORM_INPUT_ID = {
  CRC_AMOUNT: "custom-combo-crc-amount",
  EQUIPMENT_SELECTION: "custom-combo-equipment-selection",
  EQUIPMENT_SELECTION_ERROR:
    "custom-combo-equipment-selection-error",
  UNIT_PREFIX: "custom-combo-unit-",
  USD_AMOUNT: "custom-combo-usd-amount",
} as const;
