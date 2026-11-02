import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";
import {
  renderUnitSubmit,
  submitUnitFormEvent,
} from "./UnitSubmit.harness";
import {
  FAKE_CODE_ERROR,
  FAKE_SERVER_MESSAGE,
  SUCCESS_RESULT,
} from "./useUnitForm.constants";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockCreateUnitAction = vi.fn();
const mockUpdateUnitAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/createUnitAction", () => ({
  createUnitAction: (input: CreateUnitInput) =>
    mockCreateUnitAction(input),
}));

vi.mock("../services/updateUnitAction", () => ({
  updateUnitAction: (input: UpdateUnitInput) =>
    mockUpdateUnitAction(input),
}));

describe("useUnitFormSubmit outcomes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockCreateUnitAction.mockResolvedValue(SUCCESS_RESULT);
    mockUpdateUnitAction.mockResolvedValue(SUCCESS_RESULT);
  });

  it("shows the code error under the code field without a toast or navigation", async () => {
    mockCreateUnitAction.mockResolvedValue({
      status: UNIT_MUTATION_STATUS.ERROR,
      codeError: FAKE_CODE_ERROR,
    });
    const setCodeError = vi.fn();
    const { result } = renderUnitSubmit({ setCodeError });

    await submitUnitFormEvent(result);

    expect(setCodeError).toHaveBeenCalledWith(
      FAKE_CODE_ERROR
    );
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
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
      expected: UNIT_CATALOG_COPY.GENERIC_MUTATION_ERROR,
    },
  ])(
    "shows $description when the action returns an error",
    async ({ message, expected }) => {
      mockCreateUnitAction.mockResolvedValue({
        status: UNIT_MUTATION_STATUS.ERROR,
        message,
      });
      const { result } = renderUnitSubmit();

      await submitUnitFormEvent(result);

      expect(mockShowToast).toHaveBeenCalledWith(
        STATUS.ERROR,
        expected
      );
      expect(mockPush).not.toHaveBeenCalled();
    }
  );
});
