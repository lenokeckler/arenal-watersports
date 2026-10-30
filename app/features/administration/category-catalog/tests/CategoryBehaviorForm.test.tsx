import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { createCategoryBehaviorFormPage } from "./CategoryBehaviorForm.page";
import { DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT } from "./UpdateCategoryBehaviorInput.constants";

const BEHAVIOR_CONTROL_COUNT = 9;

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

describe("CategoryBehaviorForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
  });

  it("renders the heading, the read-only tracking mode and the nine controls", () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    expect(
      categoryBehaviorFormPage.getHeading()
    ).toBeInTheDocument();
    expect(
      categoryBehaviorFormPage.getTrackingModeLine(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_UNIT_LABEL
      )
    ).toBeInTheDocument();
    expect(
      categoryBehaviorFormPage.getAllControls()
    ).toHaveLength(BEHAVIOR_CONTROL_COUNT);
  });

  it("shows the tracking mode of a by-quantity category", () => {
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
      categoryBehaviorFormPage.getTrackingModeLine(
        CATEGORY_CATALOG_COPY.TRACKING_MODE_BY_QUANTITY_LABEL
      )
    ).toBeInTheDocument();
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

  it("shows the duration error and never calls the server when a reservable category has no duration", async () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    await categoryBehaviorFormPage.clearDuration();
    await categoryBehaviorFormPage.submit();

    expect(
      categoryBehaviorFormPage.getDurationError()
    ).toBeInTheDocument();
    expect(
      mockUpdateCategoryBehaviorAction
    ).not.toHaveBeenCalled();
  });

  it("sends the behavior to the server when Guardar comportamiento is clicked", async () => {
    mockUpdateCategoryBehaviorAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    await categoryBehaviorFormPage.submit();

    expect(
      mockUpdateCategoryBehaviorAction
    ).toHaveBeenCalledWith(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );
  });

  it("disables every control while the submit is in flight", async () => {
    mockUpdateCategoryBehaviorAction.mockReturnValue(
      new Promise(() => undefined)
    );
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    await categoryBehaviorFormPage.submit();

    expect(
      categoryBehaviorFormPage.isSubmitButtonLoading()
    ).toBe(true);
    categoryBehaviorFormPage
      .getAllControls()
      .forEach((control) => {
        expect(control).toBeDisabled();
      });
  });

  it("navigates back to the category list when Cancelar is clicked", async () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage();

    await categoryBehaviorFormPage.cancel();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
