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
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import {
  renderCategoryDepositSubmit,
  submitCategoryDepositForm,
} from "./CategoryDepositSubmit.harness";
import {
  buildCategoryDepositFormValues,
  DECIMAL_DEPOSIT,
  DECIMAL_DEPOSIT_TEXT,
  EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
  PADDED_VALID_TEXT,
} from "./CategoryDepositFormValues.constants";
import { buildUpdateCategoryDepositInput } from "./UpdateCategoryDepositInput.constants";
import {
  FORMAT_ERRORS,
  PADDED_DEPOSIT_AMOUNT,
  SUCCESS_RESULT,
} from "./useCategoryDepositForm.constants";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockOnValidationErrors = vi.fn();
const mockUpdateCategoryDepositAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/updateCategoryDepositAction", () => ({
  updateCategoryDepositAction: (
    input: UpdateCategoryDepositInput
  ) => mockUpdateCategoryDepositAction(input),
}));

describe("useCategoryDepositFormSubmit", () => {
  beforeEach(() => vi.resetAllMocks());

  it("reports the validation errors and neither calls the server nor toasts", async () => {
    const { result } = renderCategoryDepositSubmit(
      buildCategoryDepositFormValues({
        depositCrc: INVALID_FORMAT_TEXT,
        depositUsd: INVALID_FORMAT_TEXT,
      }),
      mockOnValidationErrors
    );

    const preventDefault =
      await submitCategoryDepositForm(result);

    expect(preventDefault).toHaveBeenCalled();
    expect(mockOnValidationErrors).toHaveBeenCalledWith(
      FORMAT_ERRORS
    );
    expect(
      mockUpdateCategoryDepositAction
    ).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it.each([
    {
      description: "the parsed amounts",
      values: buildCategoryDepositFormValues(),
      input: buildUpdateCategoryDepositInput(),
    },
    {
      description:
        "null amounts when both fields are empty",
      values: EMPTY_CATEGORY_DEPOSIT_FORM_VALUES,
      input: buildUpdateCategoryDepositInput({
        depositCrc: null,
        depositUsd: null,
      }),
    },
    {
      description: "trimmed amounts for padded text",
      values: buildCategoryDepositFormValues({
        depositCrc: PADDED_VALID_TEXT,
        depositUsd: ` ${DECIMAL_DEPOSIT_TEXT} `,
      }),
      input: buildUpdateCategoryDepositInput({
        depositCrc: PADDED_DEPOSIT_AMOUNT,
        depositUsd: DECIMAL_DEPOSIT,
      }),
    },
  ])(
    "sends $description, shows the success toast and returns to the category list",
    async ({ values, input }) => {
      mockUpdateCategoryDepositAction.mockResolvedValue(
        SUCCESS_RESULT
      );
      const { result } = renderCategoryDepositSubmit(
        values,
        mockOnValidationErrors
      );

      await submitCategoryDepositForm(result);

      expect(mockOnValidationErrors).toHaveBeenCalledWith(
        {}
      );
      expect(
        mockUpdateCategoryDepositAction
      ).toHaveBeenCalledWith(input);
      expect(mockShowToast).toHaveBeenCalledWith(
        STATUS.SUCCESS,
        CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
      );
      expect(mockPush).toHaveBeenCalledExactlyOnceWith(
        PATHS.ADMINISTRATION.CATEGORIES
      );
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the server message and does not leave the screen when the action returns an error", async () => {
    mockUpdateCategoryDepositAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR,
    });
    const { result } = renderCategoryDepositSubmit();

    await submitCategoryDepositForm(result);

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
