import {
  act,
  renderHook,
  type RenderHookResult,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { useCategoryCreateFormViewModel } from "../hooks/useCategoryCreateFormViewModel";
import type { CategoryFormFieldChangeEvent } from "../models/CategoryFormFieldChangeEvent.type";
import { VALID_CATEGORY_CREATE_FORM_VALUES } from "./CategoryCreateFormValues.constants";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockCreateCategoryAction = vi.fn();
const mockUnstableRethrow = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  unstable_rethrow: (error: unknown) =>
    mockUnstableRethrow(error),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/createCategoryAction", () => ({
  createCategoryAction: (
    input: typeof VALID_CATEGORY_CREATE_FORM_VALUES
  ) => mockCreateCategoryAction(input),
}));

const submitForm = async (
  result: RenderHookResult<
    ReturnType<typeof useCategoryCreateFormViewModel>,
    unknown
  >["result"]
): Promise<void> => {
  const formEvent = {
    preventDefault: vi.fn(),
  } as unknown as React.FormEvent;

  await act(async () => {
    await result.current.onSubmit(formEvent);
  });
};

describe("useCategoryCreateFormViewModel submit", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
    mockUnstableRethrow.mockReset();
  });

  it("shows a success toast, navigates back, and stops submitting when the creation succeeds", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: "some-id",
    });
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    act(() => {
      result.current.onNameChange({
        target: {
          value: VALID_CATEGORY_CREATE_FORM_VALUES.name,
        },
      } as CategoryFormFieldChangeEvent);
      result.current.onTrackingModeChange({
        target: {
          value:
            VALID_CATEGORY_CREATE_FORM_VALUES.trackingMode,
        },
      } as CategoryFormFieldChangeEvent);
      result.current.onGroupNameChange({
        target: {
          value:
            VALID_CATEGORY_CREATE_FORM_VALUES.groupName,
        },
      } as CategoryFormFieldChangeEvent);
    });

    await submitForm(result);

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
    );
    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
    expect(result.current.isSubmitting).toBe(false);
  });

  it("sets the group-name field error without a toast or navigation when the group conflicts", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      groupNameError: "some message",
    });
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    act(() => {
      result.current.onNameChange({
        target: {
          value: VALID_CATEGORY_CREATE_FORM_VALUES.name,
        },
      } as CategoryFormFieldChangeEvent);
      result.current.onTrackingModeChange({
        target: {
          value:
            VALID_CATEGORY_CREATE_FORM_VALUES.trackingMode,
        },
      } as CategoryFormFieldChangeEvent);
    });

    await submitForm(result);

    expect(result.current.errors.groupName).toBe(
      "some message"
    );
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
