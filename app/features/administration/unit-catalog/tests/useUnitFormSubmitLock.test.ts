import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import {
  renderUnitSubmit,
  submitUnitFormEvent,
} from "./UnitSubmit.harness";
import {
  FAKE_ACTION_FAILURE_MESSAGE,
  FAKE_CONTROL_FLOW_SIGNAL_MESSAGE,
  SUBMISSIONS_AFTER_RELEASE,
  SUCCESS_RESULT,
} from "./useUnitForm.constants";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockCreateUnitAction = vi.fn();
const mockUnstableRethrow = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: (error: unknown) =>
    mockUnstableRethrow(error),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: (input: CreateUnitInput) =>
    mockCreateUnitAction(input),
}));

describe("useUnitFormSubmit lock", () => {
  beforeEach(() => vi.resetAllMocks());

  it("shows the generic error and releases the form when the action throws", async () => {
    const failure = new Error(FAKE_ACTION_FAILURE_MESSAGE);
    mockCreateUnitAction.mockRejectedValue(failure);
    const { result } = renderUnitSubmit();

    await submitUnitFormEvent(result);

    expect(mockUnstableRethrow).toHaveBeenCalledWith(
      failure
    );
    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      UNIT_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("rethrows a control-flow error without a toast and releases the form", async () => {
    const controlFlowSignal = new Error(
      FAKE_CONTROL_FLOW_SIGNAL_MESSAGE
    );
    mockCreateUnitAction.mockRejectedValue(
      controlFlowSignal
    );
    mockUnstableRethrow.mockImplementation(
      (error: unknown) => {
        throw error;
      }
    );
    const { result } = renderUnitSubmit();

    await expect(submitUnitFormEvent(result)).rejects.toBe(
      controlFlowSignal
    );

    expect(mockShowToast).not.toHaveBeenCalled();
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
      mockCreateUnitAction.mockImplementation(
        implementation
      );
      const { result } = renderUnitSubmit();

      await submitUnitFormEvent(result);
      await submitUnitFormEvent(result);

      expect(mockCreateUnitAction).toHaveBeenCalledTimes(
        SUBMISSIONS_AFTER_RELEASE
      );
    }
  );
});
