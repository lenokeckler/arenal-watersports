import type { Page } from "@playwright/test";
import {
  ARIA_ROLE,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";
import { INVENTORY_UNIT_STATUS_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";
import { getMainRegion } from "../support/mainRegion";

export const createInventoryQueries = (page: Page) => {
  const main = getMainRegion(page);
  return {
    getCategoryLink: (name: string) =>
      main.getByRole(ARIA_ROLE.LINK, { name }),
    getCopy: (copy: string) =>
      main.getByText(copy, { exact: true }),
    getCountValues: (count: number) =>
      main.getByText(count.toString(), { exact: true }),
    getHeading: (name: string) =>
      main.getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL.PAGE,
        name,
        exact: true,
      }),
    getUnitStatus: (
      code: string,
      status: ActiveInventoryUnitStatus
    ) =>
      main
        .getByRole(ARIA_ROLE.LIST_ITEM)
        .filter({ hasText: code })
        .getByText(INVENTORY_UNIT_STATUS_COPY[status], {
          exact: true,
        }),
  };
};
