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

describe("useCategoryCreateFormViewModel lock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateCategoryAction.mockReset();
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
});
