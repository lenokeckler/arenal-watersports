import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import InventoryFiltersForm from "../components/InventoryFiltersForm";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";

it("sends the query and the mode by GET and shows the current filters", () => {
  render(
    <InventoryFiltersForm
      filters={{ mode: "by_unit", query: "kayak" }}
    />
  );

  const form = screen.getByRole("search", {
    name: INVENTORY_COPY.FILTERS_LABEL,
  });

  expect(form).toHaveAttribute("method", "get");
  expect(
    screen.getByRole("searchbox", {
      name: INVENTORY_COPY.FILTER_QUERY_LABEL,
    })
  ).toHaveValue("kayak");
  expect(
    screen.getByRole("combobox", {
      name: INVENTORY_COPY.FILTER_MODE_LABEL,
    })
  ).toHaveValue("by_unit");
  expect(
    screen.getByRole("button", {
      name: INVENTORY_COPY.FILTER_SUBMIT,
    })
  ).toBeInTheDocument();
});
