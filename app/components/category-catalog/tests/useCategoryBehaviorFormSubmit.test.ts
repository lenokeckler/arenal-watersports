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
import { STATUS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { useCategoryBehaviorFormSubmit } from "../hooks/useCategoryBehaviorFormSubmit";
import type { CategoryBehaviorFormSubmitViewModel } from "../models/CategoryBehaviorFormSubmitViewModel.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import {
  DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
  FAKE_UPDATE_CATEGORY_ID,
} from "./UpdateCategoryBehaviorInput.constants";

const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockOnValidationErrors = vi.fn();
const mockUpdateCategoryBehaviorAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
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
  values: CategoryBehaviorFormValues = VALID_CATEGORY_BEHAVIOR_FORM_VALUES
) =>
  renderHook(() =>
    useCategoryBehaviorFormSubmit({
      categoryId: FAKE_UPDATE_CATEGORY_ID,
      values,
      onValidationErrors: mockOnValidationErrors,
    })
  );

const buildFormEvent = () => ({
  preventDefault: vi.fn(),
});

const submitForm = async (
  result: RenderHookResult<
    CategoryBehaviorFormSubmitViewModel,
    unknown
  >["result"]
): Promise<ReturnType<typeof buildFormEvent>> => {
  const formEvent = buildFormEvent();

  await act(async () => {
    await result.current.onSubmit(
      formEvent as unknown as React.FormEvent
    );
  });

  return formEvent;
};

describe("useCategoryBehaviorFormSubmit", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
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

  it("sends the mapped input, shows the success toast and refreshes", async () => {
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
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(result.current.isSubmitting).toBe(false);
  });

  it("shows the server message and does not refresh when the action returns an error", async () => {
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
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("shows the generic error and releases the form when the action throws", async () => {
    mockUpdateCategoryBehaviorAction.mockRejectedValue(
      new Error()
    );
    const { result } = renderSubmit();

    await submitForm(result);

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("calls the server once when submitted again while pending", async () => {
    let resolveAction: (value: unknown) => void = () =>
      undefined;
    mockUpdateCategoryBehaviorAction.mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderSubmit();

    await act(async () => {
      const firstSubmit = result.current.onSubmit(
        buildFormEvent() as unknown as React.FormEvent
      );
      await result.current.onSubmit(
        buildFormEvent() as unknown as React.FormEvent
      );
      resolveAction({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
      });
      await firstSubmit;
    });

    expect(
      mockUpdateCategoryBehaviorAction
    ).toHaveBeenCalledTimes(1);
  });
});
