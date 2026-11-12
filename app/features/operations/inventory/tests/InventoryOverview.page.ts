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
    within(
      screen.getByRole("row", {
        name: new RegExp(categoryName),
      })
    ).getAllByText(String(metricValue), { exact: true })[0];

  return {
    getCategoryMetricValue,
    getCategoryLink,
    getInventoryHeading,
  };
};
