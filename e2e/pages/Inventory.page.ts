import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createInventoryQueries } from "./InventoryQueries.page";

export const createInventoryPage = (page: Page) => {
  const queries = createInventoryQueries(page);
  return {
    ...queries,
    goTo: () => page.goto(PATHS.OPERATIONS.INVENTORY),
    goToCategory: async (name: string): Promise<void> => {
      await queries.getCategoryLink(name).click();
      await queries.getHeading(name).waitFor();
    },
    goToCategoryId: (id: string) =>
      page.goto(PATHS.OPERATIONS.INVENTORY_CATEGORY(id)),
    goToPage: (pageIndex: number) =>
      page.goto(PATHS.OPERATIONS.INVENTORY_PAGE(pageIndex)),
  };
};
