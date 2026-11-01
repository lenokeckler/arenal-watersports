import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { createCategoryBehaviorFormPage } from "./CategoryBehaviorForm.page";

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
});
