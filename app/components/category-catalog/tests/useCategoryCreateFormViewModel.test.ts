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
import { EMPTY_CATEGORY_CREATE_FORM_VALUES } from "../constants/EmptyCategoryCreateFormValues.constants";
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

describe("useCategoryCreateFormViewModel", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
    mockUnstableRethrow.mockReset();
  });

  it("starts with empty values, no errors, and not submitting", () => {
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    expect(result.current.values).toEqual(
      EMPTY_CATEGORY_CREATE_FORM_VALUES
    );
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it("updates only the name field when onNameChange is called", () => {
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    act(() => {
      result.current.onNameChange({
        target: { value: "Kayak doble" },
      } as CategoryFormFieldChangeEvent);
    });

    expect(result.current.values).toEqual({
      ...EMPTY_CATEGORY_CREATE_FORM_VALUES,
      name: "Kayak doble",
    });
  });

  it("clears a field's own error as soon as it is retyped", async () => {
    mockCreateCategoryAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    await submitForm(result);
    act(() => {
      result.current.onNameChange({
        target: { value: "" },
      } as CategoryFormFieldChangeEvent);
    });

    expect(result.current.errors.name).toBeUndefined();
  });

  it("flags every required field and never calls the server when values are empty", async () => {
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    await submitForm(result);

    expect(result.current.errors.name).toBe(
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR
    );
    expect(result.current.errors.trackingMode).toBe(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR
    );
    expect(mockCreateCategoryAction).not.toHaveBeenCalled();
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

  it("shows a generic error toast and stops submitting without navigating when the action throws", async () => {
    mockCreateCategoryAction.mockRejectedValue(
      new Error("boom")
    );
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

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(result.current.isSubmitting).toBe(false);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("rethrows a Next control-flow error without a toast and releases the submit lock", async () => {
    const controlFlowError = new Error("NEXT_REDIRECT");
    mockCreateCategoryAction.mockRejectedValue(
      controlFlowError
    );
    mockUnstableRethrow.mockImplementation((error) => {
      throw error;
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

    await expect(submitForm(result)).rejects.toBe(
      controlFlowError
    );

    expect(mockUnstableRethrow).toHaveBeenCalledWith(
      controlFlowError
    );
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("ignores a second submit while the first is still pending", async () => {
    let resolveCreateCategoryAction: (
      result: Awaited<
        ReturnType<typeof mockCreateCategoryAction>
      >
    ) => void = () => undefined;
    mockCreateCategoryAction.mockReturnValue(
      new Promise((resolve) => {
        resolveCreateCategoryAction = resolve;
      })
    );
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

    const formEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.onSubmit(formEvent);
      result.current.onSubmit(formEvent);
    });

    expect(mockCreateCategoryAction).toHaveBeenCalledTimes(
      1
    );

    await act(async () => {
      resolveCreateCategoryAction({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
        categoryId: "some-id",
      });
      await Promise.resolve();
    });
  });

  it("navigates back to the category list when onBack is called", () => {
    const { result } = renderHook(() =>
      useCategoryCreateFormViewModel()
    );

    result.current.onBack();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
