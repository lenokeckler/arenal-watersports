import { expect, it, vi } from "vitest";
import { PAGINATION, PATHS } from "@/app/constants";
import InventoryCategoryView from "../InventoryCategoryView";
import { EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR } from "./InventoryCategoryDetails.constants";
import {
  expectUnitCodesAndStatuses,
  renderQuantityCategory,
  renderUnitCategory,
} from "./InventoryCategoryView.test.helpers";

vi.mock("../InventoryRealtimeRefresh", () => ({
  default: () => null,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

it("shows each unit code and status in a unit-tracked category", () => {
  const { categoryDetails, inventoryCategoryPage } =
    renderUnitCategory();

  expect(
    inventoryCategoryPage.getCategoryHeading(
      categoryDetails.category.name
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getBackLink()
  ).toHaveAttribute("href", PATHS.OPERATIONS.INVENTORY);
  expect(
    inventoryCategoryPage.queryAdjustmentReason()
  ).not.toBeInTheDocument();
  expectUnitCodesAndStatuses();
});

it("shows quantity counts without a unit list", () => {
  const { categoryDetails, inventoryCategoryPage } =
    renderQuantityCategory();

  expect(
    inventoryCategoryPage.getCategoryHeading(
      categoryDetails.category.name
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getCountValue(
      categoryDetails.category.available
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getCountValue(
      categoryDetails.category.damaged
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getCountValue(
      categoryDetails.category.inRepair
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getCountValue(
      categoryDetails.category.total
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.queryUnitListItem()
  ).not.toBeInTheDocument();
  expect(
    inventoryCategoryPage.getAdjustmentReason()
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getMovementHistoryHeading()
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getMovementAuthor(
      "Operations User"
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getMovementDate()
  ).toHaveTextContent("7 nov 2026");
  expect(
    inventoryCategoryPage.getMovementReason(
      "count_correction"
    )
  ).toBeVisible();
  expect(
    inventoryCategoryPage.getNextMovementPage()
  ).toHaveAttribute(
    "href",
    PATHS.OPERATIONS.INVENTORY_CATEGORY_PAGE(
      categoryDetails.category.id,
      PAGINATION.ONE_PAGE
    )
  );
});

it("requires a reason before submitting an adjustment", async () => {
  const { inventoryCategoryPage } =
    renderQuantityCategory();

  await inventoryCategoryPage.clickSaveAdjustment();

  expect(
    inventoryCategoryPage.getRequiredReasonError()
  ).toBeVisible();
});

it("resets adjustment values when changing quantity categories", async () => {
  const {
    categoryDetails,
    inventoryCategoryPage,
    rerender,
  } = renderQuantityCategory();
  if (!("movements" in categoryDetails)) {
    throw new Error(
      EXPECTED_QUANTITY_CATEGORY_DETAILS_ERROR
    );
  }
  const nextAvailable =
    categoryDetails.category.available * 2;
  const nextDetails = {
    ...categoryDetails,
    category: {
      ...categoryDetails.category,
      available: nextAvailable,
      id: "aaaaaaaa-0000-4000-8000-000000000003",
      total: categoryDetails.category.total + nextAvailable,
    },
  };

  await inventoryCategoryPage.setAvailableAdjustment(
    String(nextAvailable + 1)
  );
  rerender(
    <InventoryCategoryView categoryDetails={nextDetails} />
  );

  expect(
    inventoryCategoryPage.getAvailableAdjustment()
  ).toHaveValue(nextAvailable);
});
