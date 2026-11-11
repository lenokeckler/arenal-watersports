import { PATHS } from "@/app/constants";
import { E2E_INVENTORY_CATEGORY_ROUTE } from "../constants/E2eSystemRoute.constants";
import { readSeededInventoryCategoryId } from "./readSeededInventoryCategoryId";

export const resolveSystemRoute = async (
  route: string
): Promise<string> => {
  if (route !== E2E_INVENTORY_CATEGORY_ROUTE) {
    return route;
  }

  const categoryId = await readSeededInventoryCategoryId();

  return PATHS.OPERATIONS.INVENTORY_CATEGORY(categoryId);
};
