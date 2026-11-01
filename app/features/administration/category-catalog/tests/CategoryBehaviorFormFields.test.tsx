import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { createCategoryBehaviorFormPage } from "./CategoryBehaviorForm.page";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockUpdateCategoryBehaviorAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/updateCategoryBehaviorAction", () => ({
  updateCategoryBehaviorAction: (
    input: UpdateCategoryBehaviorInput
  ) => mockUpdateCategoryBehaviorAction(input),
}));

describe("CategoryBehaviorForm fields", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
  });

  it("enables the usage metric while the category has a motor and disables it once the motor is cleared", async () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getUsageMetricSelect()
    ).toBeEnabled();

    await categoryBehaviorFormPage.toggleHasMotor();

    expect(
      categoryBehaviorFormPage.getUsageMetricSelect()
    ).toBeDisabled();
  });

  it("disables the usage metric when the category has no motor", () => {
    render(
      <CategoryBehaviorForm
        behavior={{
          ...DEFAULT_CATEGORY_BEHAVIOR,
          hasMotor: false,
          usageMetric: null,
          consumesFuel: false,
        }}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getUsageMetricSelect()
    ).toBeDisabled();
  });

  it("enables the condition photos checkbox for a by-unit category", () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getHasConditionPhotosCheckbox()
    ).toBeEnabled();
  });

  it("disables the condition photos checkbox for a by-quantity category", () => {
    render(
      <CategoryBehaviorForm
        behavior={{
          ...DEFAULT_CATEGORY_BEHAVIOR,
          trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
        }}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getHasConditionPhotosCheckbox()
    ).toBeDisabled();
  });
});
