import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { createCategoryBehaviorFormPage } from "./CategoryBehaviorForm.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryBehaviorAction", () => ({
  updateCategoryBehaviorAction: vi.fn(),
}));

describe("CategoryBehaviorForm interchangeable units", () => {
  it("shows the interchangeable checkbox checked and disabled for a by-quantity category", () => {
    render(
      <CategoryBehaviorForm
        behavior={{
          ...DEFAULT_CATEGORY_BEHAVIOR,
          trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
          unitsAreInterchangeable: false,
        }}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
    ).toBeDisabled();
    expect(
      categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
    ).toBeChecked();
  });

  it("enables the interchangeable checkbox for a by-unit category", () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getUnitsAreInterchangeableCheckbox()
    ).toBeEnabled();
  });
});
