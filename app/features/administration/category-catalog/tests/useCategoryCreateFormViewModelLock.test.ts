import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
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

describe("useCategoryCreateFormViewModel lock", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockShowToast.mockClear();
    mockCreateCategoryAction.mockReset();
    mockUnstableRethrow.mockReset();
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
