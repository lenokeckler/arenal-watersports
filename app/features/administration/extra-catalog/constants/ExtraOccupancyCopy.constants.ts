import { EXTRA_OCCUPANCY_LIMITS } from "./ExtraOccupancyLimits.constants";

export const EXTRA_OCCUPANCY_COPY = {
  CATEGORY_ERROR:
    "Elija un equipo del inventario que se cuente por cantidad y esté activo.",
  CHARGE_ONLY_LABEL: "Solo cobro adicional",
  INCOMPLETE_ERROR:
    "Elija el equipo del inventario y escriba la cantidad que ocupa el extra.",
  LOCKED_ERROR:
    "Este extra ya se usa en reservas, por lo que no se puede cambiar el equipo que ocupa. Desactive el extra y cree uno nuevo.",
  OCCUPIES_LABEL: (
    quantity: number,
    categoryName: string
  ): string => `Ocupa ${quantity} × ${categoryName}`,
  QUANTITY_ERROR: `Escriba una cantidad entera entre ${EXTRA_OCCUPANCY_LIMITS.MIN_QUANTITY} y ${EXTRA_OCCUPANCY_LIMITS.MAX_QUANTITY}.`,
} as const;
