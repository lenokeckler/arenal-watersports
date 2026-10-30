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
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { buildFormSubmitEvent } from "@/app/utils/form-submit/tests/buildFormSubmitEvent";
import {
  renderCategoryAlertSubmit,
  submitCategoryAlertForm,
} from "./CategoryAlertSubmit.harness";
import {
  FAKE_ACTION_FAILURE_MESSAGE,
  FAKE_CONTROL_FLOW_SIGNAL_MESSAGE,
  SUBMISSIONS_AFTER_RELEASE,
  SUCCESS_RESULT,
} from "./useCategoryAlertForm.constants";

const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockUpdateCategoryAlertsAction = vi.fn();
const mockUnstableRethrow = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
  unstable_rethrow: (error: unknown) =>
    mockUnstableRethrow(error),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/updateCategoryAlertsAction", () => ({
  updateCategoryAlertsAction: (
    input: UpdateCategoryAlertsInput
  ) => mockUpdateCategoryAlertsAction(input),
}));

describe("useCategoryAlertFormSubmit lock", () => {
  beforeEach(() => vi.resetAllMocks());

  it("shows the generic error and releases the form when the action throws", async () => {
    const failure = new Error(FAKE_ACTION_FAILURE_MESSAGE);
    mockUpdateCategoryAlertsAction.mockRejectedValue(
      failure
    );
    const { result } = renderCategoryAlertSubmit();

    await submitCategoryAlertForm(result);

    expect(mockUnstableRethrow).toHaveBeenCalledWith(
      failure
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("rethrows a control-flow error without a toast and releases the form", async () => {
    const controlFlowSignal = new Error(
      FAKE_CONTROL_FLOW_SIGNAL_MESSAGE
    );
    mockUpdateCategoryAlertsAction.mockRejectedValue(
      controlFlowSignal
    );
    mockUnstableRethrow.mockImplementation(
      (error: unknown) => {
        throw error;
      }
    );
    const { result } = renderCategoryAlertSubmit();

    await expect(
      submitCategoryAlertForm(result)
    ).rejects.toBe(controlFlowSignal);

    expect(mockShowToast).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("is submitting while pending and ignores a second submit", async () => {
    let resolveAction: (value: unknown) => void = () =>
      undefined;
    mockUpdateCategoryAlertsAction.mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderCategoryAlertSubmit();
    let firstSubmit: Promise<void> = Promise.resolve();

    act(() => {
      firstSubmit = result.current.onSubmit(
        buildFormSubmitEvent()
      );
    });
    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      await result.current.onSubmit(buildFormSubmitEvent());
      resolveAction(SUCCESS_RESULT);
      await firstSubmit;
    });

    expect(
      mockUpdateCategoryAlertsAction
    ).toHaveBeenCalledTimes(1);
    expect(result.current.isSubmitting).toBe(false);
  });

  it.each([
    {
      description: "a success",
      implementation: () => Promise.resolve(SUCCESS_RESULT),
    },
    {
      description: "a thrown error",
      implementation: () =>
        Promise.reject(
          new Error(FAKE_ACTION_FAILURE_MESSAGE)
        ),
    },
  ])(
    "accepts a new submission after $description",
    async ({ implementation }) => {
      mockUpdateCategoryAlertsAction.mockImplementation(
        implementation
      );
      const { result } = renderCategoryAlertSubmit();

      await submitCategoryAlertForm(result);
      await submitCategoryAlertForm(result);

      expect(
        mockUpdateCategoryAlertsAction
      ).toHaveBeenCalledTimes(SUBMISSIONS_AFTER_RELEASE);
    }
  );
});
