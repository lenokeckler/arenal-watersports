import { INVENTORY_COUNT_HISTORY_COPY } from "@/app/features/operations/inventory-count-history/constants/InventoryCountHistoryCopy.constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const E2E_INVENTORY_COUNT_HISTORY = {
  DETAIL_DIFFERENCE:
    INVENTORY_COUNT_HISTORY_COPY.UNIT_DIFFERENCE(
      "JET-01",
      "Jet Ski",
      "Disponible",
      "Dañada"
    ),
  HEADING: INVENTORY_COUNT_HISTORY_COPY.HEADING,
  LINK: INVENTORY_COPY.COUNT_HISTORY,
  NOTES: "Historial de la prueba E2E",
  ONE_DIFFERENCE:
    INVENTORY_COUNT_HISTORY_COPY.DIFFERENCES(1),
  UNIT_CODE: "JET-01",
} as const;

export const E2E_INVENTORY_COUNT_HISTORY_SCREENSHOT_BASENAME =
  {
    DETAIL: "14-inventory-count-detail",
    LIST: "13-inventory-count-history",
  } as const;
