import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import InventoryExpiryAlerts from "../components/InventoryExpiryAlerts";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import {
  EXPIRED_ALERT,
  EXPIRY_ALERT,
  EXPIRY_DATE_TEXT,
} from "./InventoryExpiryAlerts.constants";

it("says when the item expires, in how many days and how far ahead it warns", () => {
  render(<InventoryExpiryAlerts alerts={[EXPIRY_ALERT]} />);

  expect(
    screen.getByText(INVENTORY_COPY.EXPIRY_ALERTS_TITLE)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      INVENTORY_COPY.EXPIRY_ALERT(
        EXPIRY_DATE_TEXT.DECEMBER_FIFTH,
        EXPIRY_ALERT.daysToExpiry,
        false,
        EXPIRY_ALERT.anticipationDays
      )
    )
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Extintor/ })
  ).toHaveAttribute(
    "href",
    PATHS.OPERATIONS.INVENTORY_CATEGORY(
      EXPIRY_ALERT.categoryId
    )
  );
});

it("says it already expired and has to be replaced", () => {
  render(
    <InventoryExpiryAlerts alerts={[EXPIRED_ALERT]} />
  );

  expect(
    screen.getByText(
      INVENTORY_COPY.EXPIRY_ALERT(
        EXPIRY_DATE_TEXT.NOVEMBER_FIRST,
        EXPIRED_ALERT.daysToExpiry,
        true,
        EXPIRED_ALERT.anticipationDays
      )
    )
  ).toBeInTheDocument();
});

it("renders nothing when no category is close to expiring", () => {
  const { container } = render(
    <InventoryExpiryAlerts alerts={[]} />
  );

  expect(container).toBeEmptyDOMElement();
});
