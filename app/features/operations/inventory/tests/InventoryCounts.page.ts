import { screen } from "@testing-library/react";
import type { Nullable } from "@/app/types";

export const createInventoryCountsPage = () => ({
  getMetricValue: (label: string): Nullable<string> =>
    screen.getByText(label).parentElement?.firstElementChild
      ?.textContent,
  queryMetric: (label: string) => screen.queryByText(label),
});
