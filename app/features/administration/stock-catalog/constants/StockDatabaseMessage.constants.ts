export const STOCK_DATABASE_MESSAGE = {
  ALREADY_COUNTED:
    "La categoria ya tiene un conteo registrado",
  CATEGORY_NOT_BY_QUANTITY:
    "Una categoria identificada por unidad no lleva conteo de stock",
  EXPIRY_NOT_APPLICABLE:
    "La categoria no tiene aviso por vencimiento",
  INVALID_REASON: "Motivo de ajuste no valido",
  NEGATIVE_QUANTITY:
    "Las cantidades no pueden ser negativas",
  NO_CHANGE: "El ajuste no cambia nada",
  REMOVAL_MUST_LOWER_TOTAL:
    "Botar o perder baja la cantidad total",
} as const;
