import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";

export const createInventoryOverviewPage = () => {
  const getInventoryHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: INVENTORY_COPY.TITLE,
    });

  const getCategoryLink = (categoryName: string) =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: new RegExp(categoryName),
    });

  const getCategoryMetricValue = (
    categoryName: string,
    metricValue: number
  ) =>
    within(getCategoryLink(categoryName)).getByText(
      String(metricValue),
      { exact: true }
    );

  return {
    getCategoryMetricValue,
    getCategoryLink,
    getInventoryHeading,
  };
};
