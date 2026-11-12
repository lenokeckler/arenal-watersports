import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import InventoryErrorView from "../InventoryErrorView";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { createInventoryErrorViewPage } from "./InventoryErrorView.page";

it("announces the inventory read error in Spanish", () => {
  render(<InventoryErrorView reset={vi.fn()} />);
  const errorPage = createInventoryErrorViewPage();

  expect(errorPage.getHeading()).toBeVisible();
  expect(errorPage.getDescription()).toHaveTextContent(
    INVENTORY_COPY.LOAD_ERROR_DESCRIPTION
  );
  expect(errorPage.getRetryButton()).toBeEnabled();
});

it("requests a retry when the worker clicks the button", async () => {
  const reset = vi.fn();
  render(<InventoryErrorView reset={reset} />);
  const errorPage = createInventoryErrorViewPage();

  await errorPage.retry();

  expect(reset).toHaveBeenCalledOnce();
});

it("allows keyboard users to request a retry", async () => {
  const reset = vi.fn();
  render(<InventoryErrorView reset={reset} />);
  const errorPage = createInventoryErrorViewPage();

  await errorPage.retryWithKeyboard();

  expect(errorPage.getRetryButton()).toHaveFocus();
  expect(reset).toHaveBeenCalledOnce();
});
