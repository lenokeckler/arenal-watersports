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
});
