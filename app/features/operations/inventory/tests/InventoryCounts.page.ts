import { screen } from "@testing-library/react";
import { PAGINATION } from "@/app/constants";
import type { Nullable } from "@/app/types";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";

const INVENTORY_COUNT_LABELS = [
  INVENTORY_COPY.AVAILABLE,
  INVENTORY_COPY.IN_USE,
  INVENTORY_COPY.DAMAGED,
  INVENTORY_COPY.IN_MAINTENANCE,
  INVENTORY_COPY.IN_REPAIR,
  INVENTORY_COPY.TOTAL,
];

export const createInventoryCountsPage = () => {
  const getInUseCount = () =>
    screen.queryByText(INVENTORY_COPY.IN_USE);

  const getMetricValue = (
    label: string
  ): Nullable<string> =>
    screen.getByText(label).parentElement?.firstElementChild
      ?.textContent;

  const getCountLabels = () =>
    screen
      .getAllByText(
        new RegExp(
          `^(${INVENTORY_COUNT_LABELS.join("|")})$`
        )
      )
      .map((label) => label.textContent);

  const getZeroValues = () =>
    screen.getAllByText(PAGINATION.ZERO_RESULTS.toString());

  const queryMetric = (label: string) =>
    screen.queryByText(label);

  return {
    getCountLabels,
    getInUseCount,
    getMetricValue,
    getZeroValues,
    queryMetric,
  };
};
