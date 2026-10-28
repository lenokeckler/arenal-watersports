import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import {
  INVENTORY_COPY,
  INVENTORY_UNIT_STATUS_COPY,
} from "../constants/InventoryCopy.constants";
import { EXPECTED_INVENTORY_UNIT_ROW_ERROR } from "./InventoryCategoryDetails.constants";
import type { ActiveInventoryUnitStatus } from "@/app/constants";

export const createInventoryCategoryPage = () => {
  const getCategoryHeading = (categoryName: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      level: 1,
      name: categoryName,
    });

  const getUnitCode = (unitCode: string) =>
    screen.getByText(unitCode, { exact: true });

  const getUnitStatus = (
    unitCode: string,
    status: ActiveInventoryUnitStatus
  ) => {
    const unitCodeElement = screen.getByText(unitCode, {
      exact: true,
    });
    const unitRow = unitCodeElement.parentElement;

    if (!unitRow) {
      throw new Error(EXPECTED_INVENTORY_UNIT_ROW_ERROR);
    }

    return within(unitRow).getByText(
      INVENTORY_UNIT_STATUS_COPY[status],
      { exact: true }
    );
  };

  const getCountValue = (count: number) =>
    screen.getByText(String(count), { exact: true });

  const getBackLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: INVENTORY_COPY.BACK_TO_INVENTORY,
    });

  return {
    getBackLink,
    getCategoryHeading,
    getCountValue,
    getUnitCode,
    getUnitStatus,
  };
};
