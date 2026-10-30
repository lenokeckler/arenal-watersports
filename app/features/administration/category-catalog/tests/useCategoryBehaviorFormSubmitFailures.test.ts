import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { UpdateCategoryBehaviorInput } from "../models/UpdateCategoryBehaviorInput.interface";
import {
  buildFormEvent,
  renderSubmit as renderSubmitWith,
  submitForm,
} from "./useCategoryBehaviorFormSubmit.harness";

const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockOnValidationErrors = vi.fn();
const mockUpdateCategoryBehaviorAction = vi.fn();
const mockUnstableRethrow = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
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

describe("useCategoryBehaviorFormSubmit failures", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockUnstableRethrow.mockReset();
    mockShowToast.mockClear();
    mockOnValidationErrors.mockClear();
    mockUpdateCategoryBehaviorAction.mockReset();
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

  it("rethrows a Next control-flow error without a toast and releases the form", async () => {
    const controlFlowError = new Error("NEXT_REDIRECT");
    mockUpdateCategoryBehaviorAction.mockRejectedValue(
      controlFlowError
    );
    mockUnstableRethrow.mockImplementation((error) => {
      throw error;
    });
    const { result } = renderSubmit();

    await expect(submitForm(result)).rejects.toBe(
      controlFlowError
    );

    expect(mockUnstableRethrow).toHaveBeenCalledWith(
      controlFlowError
    );
    expect(mockShowToast).not.toHaveBeenCalled();
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
