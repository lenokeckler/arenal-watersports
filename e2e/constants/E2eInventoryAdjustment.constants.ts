import { INVENTORY_STOCK_ADJUSTMENT_REASON } from "@/app/features/operations/inventory/constants/InventoryStockAdjustment.constants";
import { E2E_PROJECT } from "./E2eRuntime.constants";

export const E2E_INVENTORY_ADJUSTMENT = {
  AVAILABLE: "6",
  DAMAGED: "3",
  IN_REPAIR: "2",
  REASON: INVENTORY_STOCK_ADJUSTMENT_REASON.LOST,
  SCREENSHOT: "us-ope-25-inventory-adjustment",
  SCREENSHOT_DIRECTORY:
    ".claude/skills/arenal/capturas/pr-478",
  SCREENSHOT_DEVICE_DIRECTORY: {
    DESKTOP: "desktop",
    MOBILE: "mobile",
  },
  SELECT_OPERATIONS_MODE_OPERATION:
    "select Operations mode for inventory adjustment",
  SELECT_OPERATIONS_MODE:
    "update public.workers set last_work_area = 'operaciones' where id = :'uid'",
} as const;

export const resolveInventoryAdjustmentCaptureDirectory = (
  projectName: string
): string =>
  `${E2E_INVENTORY_ADJUSTMENT.SCREENSHOT_DIRECTORY}/${projectName === E2E_PROJECT.SCREENSHOTS_MOBILE ? E2E_INVENTORY_ADJUSTMENT.SCREENSHOT_DEVICE_DIRECTORY.MOBILE : E2E_INVENTORY_ADJUSTMENT.SCREENSHOT_DEVICE_DIRECTORY.DESKTOP}`;
