import { EXTRA_OCCUPANCY_LIMITS } from "./ExtraOccupancyLimits.constants";

const LOCKED_MESSAGE =
  "Este extra ya se usa en reservas, por lo que no se puede cambiar el equipo que ocupa. Desactive el extra y cree uno nuevo.";

export const EXTRA_OCCUPANCY_COPY = {
  CATEGORY_ERROR:
    "Elija un equipo del inventario que se cuente por cantidad y esté activo.",
  CATEGORY_LABEL: "Equipo que ocupa",
  CATEGORY_PLACEHOLDER: "Elija el equipo",
  CHARGE_ONLY_LABEL: "Solo cobro adicional",
  INCOMPLETE_ERROR:
    "Elija el equipo del inventario y escriba la cantidad que ocupa el extra.",
  LOCKED_ERROR: LOCKED_MESSAGE,
  LOCKED_NOTE: LOCKED_MESSAGE,
  NO_CATEGORIES_NOTE:
    "No hay equipo del inventario que se cuente por cantidad. Créelo primero en el inventario.",
  OCCUPIES_LABEL: (
    quantity: number,
    categoryName: string
  ): string => `Ocupa ${quantity} × ${categoryName}`,
  QUANTITY_ERROR: `Escriba una cantidad entera entre ${EXTRA_OCCUPANCY_LIMITS.MIN_QUANTITY} y ${EXTRA_OCCUPANCY_LIMITS.MAX_QUANTITY}.`,
  QUANTITY_LABEL: "Cantidad que ocupa",
  SECTION_TITLE: "Equipo del inventario",
  TOGGLE_LABEL: "Este extra ocupa equipo del inventario",
} as const;
