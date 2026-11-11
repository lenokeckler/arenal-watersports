import {
  createExtraMock,
  pushMock,
  renderExtraSubmit,
  rethrowMock,
  showToastMock,
  submitExtraFormEvent,
} from "./extraForm.harness";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import {
  FAKE_ACTION_FAILURE_MESSAGE,
  FAKE_CONTROL_FLOW_SIGNAL_MESSAGE,
  FAKE_NAME_ERROR,
  FAKE_PRICE_ERROR,
  FAKE_SERVER_MESSAGE,
} from "./ExtraForm.constants";

describe("useExtraFormSubmit outcomes", () => {
  beforeEach(() => vi.resetAllMocks());

  it("shows the name error on the field without a toast or navigation", async () => {
    createExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
    const showErrors = vi.fn();
    const { result } = renderExtraSubmit({ showErrors });

    await submitExtraFormEvent(result);

    expect(showErrors).toHaveBeenCalledWith({
      name: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
    expect(showToastMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows any server name error on the field", async () => {
    createExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: FAKE_NAME_ERROR,
    });
    const showErrors = vi.fn();
    const { result } = renderExtraSubmit({ showErrors });

    await submitExtraFormEvent(result);

    expect(showErrors).toHaveBeenCalledWith({
      name: FAKE_NAME_ERROR,
    });
  });

  it("shows the server price errors on the price fields", async () => {
    createExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      priceErrors: {
        priceUsd: FAKE_PRICE_ERROR,
        prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
      },
    });
    const showErrors = vi.fn();
    const { result } = renderExtraSubmit({ showErrors });

    await submitExtraFormEvent(result);

    expect(showErrors).toHaveBeenCalledWith({
      name: undefined,
      priceUsd: FAKE_PRICE_ERROR,
      prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
    });
    expect(showToastMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it.each([
    {
      description: "the server message",
      message: FAKE_SERVER_MESSAGE,
      expected: FAKE_SERVER_MESSAGE,
    },
    {
      description: "the generic message when there is none",
      message: undefined,
      expected: EXTRA_CATALOG_COPY.GENERIC_MUTATION_ERROR,
    },
  ])(
    "toasts $description when the action returns an error",
    async ({ message, expected }) => {
      createExtraMock.mockResolvedValue({
        status: EXTRA_MUTATION_STATUS.ERROR,
        message,
      });
      const showErrors = vi.fn();
      const { result } = renderExtraSubmit({
        showErrors,
      });

      await submitExtraFormEvent(result);

      expect(showToastMock).toHaveBeenCalledWith(
        STATUS.ERROR,
        expected
      );
      expect(showErrors).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    }
  );

  it("toasts the generic error and releases the form when the action throws", async () => {
    const failure = new Error(FAKE_ACTION_FAILURE_MESSAGE);
    createExtraMock.mockRejectedValue(failure);
    const { result } = renderExtraSubmit();

    await submitExtraFormEvent(result);

    expect(rethrowMock).toHaveBeenCalledWith(failure);
    expect(showToastMock).toHaveBeenCalledWith(
      STATUS.ERROR,
      EXTRA_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
    expect(pushMock).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("rethrows a control-flow error without a toast and releases the form", async () => {
    const controlFlowSignal = new Error(
      FAKE_CONTROL_FLOW_SIGNAL_MESSAGE
    );
    createExtraMock.mockRejectedValue(controlFlowSignal);
    rethrowMock.mockImplementation((error: unknown) => {
      throw error;
    });
    const { result } = renderExtraSubmit();

    await expect(submitExtraFormEvent(result)).rejects.toBe(
      controlFlowSignal
    );

    expect(showToastMock).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });
});
