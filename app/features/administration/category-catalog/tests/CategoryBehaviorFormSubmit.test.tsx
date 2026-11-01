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
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { createCategoryBehaviorFormPage } from "./CategoryBehaviorForm.page";
import { DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT } from "./UpdateCategoryBehaviorInput.constants";

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

describe("CategoryBehaviorForm submit", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
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
