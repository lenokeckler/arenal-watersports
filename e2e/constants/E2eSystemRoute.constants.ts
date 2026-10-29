import { PATHS } from "@/app/constants";

export const E2E_INVENTORY_CATEGORY_PARAMETER =
  "[categoryId]";

export const E2E_INVENTORY_CATEGORY_ROUTE =
  decodeURIComponent(
    PATHS.OPERATIONS.INVENTORY_CATEGORY(
      E2E_INVENTORY_CATEGORY_PARAMETER
    )
  );

export const E2E_SYSTEM_ROUTE_READ = {
  MISSING_CATEGORY:
    "No valid seeded inventory category is available.",
  OPERATION: "read a seeded inventory category route",
  ROW_LIMIT: 1,
} as const;
