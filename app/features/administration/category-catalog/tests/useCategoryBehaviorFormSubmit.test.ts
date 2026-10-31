import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import { DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT } from "./UpdateCategoryBehaviorInput.constants";
import {
  renderSubmit as renderSubmitWith,
  submitForm,
} from "./useCategoryBehaviorFormSubmit.harness";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockOnValidationErrors = vi.fn();
const mockUpdateCategoryBehaviorAction = vi.fn();
const mockUnstableRethrow = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  unstable_rethrow: (error: unknown) =>
    mockUnstableRethrow(error),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/updateCategoryBehaviorAction", () => ({
  updateCategoryBehaviorAction: (
    input: UpdateCategoryBehaviorInput
  ) => mockUpdateCategoryBehaviorAction(input),
}));

const renderSubmit = (
  values?: Parameters<typeof renderSubmitWith>[1]
) => renderSubmitWith(mockOnValidationErrors, values);

describe("useCategoryBehaviorFormSubmit", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUnstableRethrow.mockReset();
    mockShowToast.mockClear();
    mockOnValidationErrors.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
  });

  it("reports the validation errors and never calls the server", async () => {
    const { result } = renderSubmit({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: STRING.Empty,
    });

    const formEvent = await submitForm(result);

    expect(formEvent.preventDefault).toHaveBeenCalled();
    expect(mockOnValidationErrors).toHaveBeenCalledWith({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
    expect(
      mockUpdateCategoryBehaviorAction
    ).not.toHaveBeenCalled();
  });

  it("sends the mapped input, shows the success toast and returns to the category list", async () => {
    mockUpdateCategoryBehaviorAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    const { result } = renderSubmit();

    await submitForm(result);

    expect(mockOnValidationErrors).toHaveBeenCalledWith({});
    expect(
      mockUpdateCategoryBehaviorAction
    ).toHaveBeenCalledWith(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST
    );
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
    expect(result.current.isSubmitting).toBe(false);
  });

  it("shows the server message and does not leave the screen when the action returns an error", async () => {
    mockUpdateCategoryBehaviorAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR,
    });
    const { result } = renderSubmit();

    await submitForm(result);

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
