import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryQuantityAlerts from "../components/InventoryQuantityAlerts";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { QUANTITY_ALERT } from "./InventoryQuantityAlerts.constants";

it("lists each category under its minimum with how many are missing and links to it", () => {
  render(
    <InventoryQuantityAlerts alerts={[QUANTITY_ALERT]} />
  );

  expect(
    screen.getByText(INVENTORY_COPY.QUANTITY_ALERTS_TITLE)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      INVENTORY_COPY.QUANTITY_ALERT(
        QUANTITY_ALERT.available,
        QUANTITY_ALERT.minimum,
        QUANTITY_ALERT.missing
      )
    )
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Chaleco/ })
  ).toHaveAttribute(
    "href",
    PATHS.OPERATIONS.INVENTORY_CATEGORY(
      QUANTITY_ALERT.categoryId
    )
  );
});

it("renders nothing when no category is under its minimum", () => {
  const { container } = render(
    <InventoryQuantityAlerts alerts={[]} />
  );

  expect(container).toBeEmptyDOMElement();
});
