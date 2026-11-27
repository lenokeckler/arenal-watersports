import type { Page } from "@playwright/test";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import {
  findCategoryId,
  seedCategoryWithBehavior,
} from "./categoryFixtures";
import { logInAsAdmin } from "./logInAsAdmin";

export const openCategoryConfigureScreen = async (
  page: Page,
  categoryName: string
) => {
  await seedCategoryWithBehavior(categoryName);
  const configurePage = createCategoryConfigurePage(page);
  await logInAsAdmin(page);
  await configurePage.goTo(
    await findCategoryId(categoryName)
  );
  return configurePage;
};
