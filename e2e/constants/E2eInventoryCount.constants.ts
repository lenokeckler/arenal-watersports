import { INVENTORY_COUNT_RESULT } from "@/app/features/operations/inventory-count/constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_COPY,
  INVENTORY_COUNT_MESSAGE,
} from "@/app/features/operations/inventory-count/constants/InventoryCountCopy.constants";
import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const E2E_INVENTORY_COUNT = {
  HEADING: INVENTORY_COUNT_COPY.HEADING,
  LINK: INVENTORY_COPY.NEW_COUNT,
  NOTES: "Conteo de la prueba E2E",
  RECORDED_MESSAGE:
    INVENTORY_COUNT_MESSAGE[
      INVENTORY_COUNT_RESULT.RECORDED
    ],
  SUBMIT: INVENTORY_COUNT_COPY.SUBMIT,
} as const;

export const E2E_INVENTORY_COUNT_SCREENSHOT_BASENAME = {
  FORM: "11-inventory-count-form",
  RECORDED: "12-inventory-count-recorded",
} as const;
