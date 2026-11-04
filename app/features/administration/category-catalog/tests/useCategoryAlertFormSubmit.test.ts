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
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import {
  renderCategoryAlertSubmit,
  submitCategoryAlertForm,
} from "./CategoryAlertSubmit.harness";
import { buildCategoryAlertFormValues } from "./CategoryAlerts.constants";
import {
  INVALID_ALERT_TEXT,
  NOT_INTEGER_ERRORS,
  SUBMIT_CASES_BY_TYPE,
  SUCCESS_RESULT,
} from "./useCategoryAlertForm.constants";

const mockPush = vi.fn();
const mockShowToast = vi.fn();
const mockOnValidationErrors = vi.fn();
const mockUpdateCategoryAlertsAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/updateCategoryAlertsAction", () => ({
  updateCategoryAlertsAction: (
    input: UpdateCategoryAlertsInput
  ) => mockUpdateCategoryAlertsAction(input),
}));

describe("useCategoryAlertFormSubmit", () => {
  beforeEach(() => vi.resetAllMocks());

  it("reports the validation errors and neither calls the server nor toasts", async () => {
    const { result } = renderCategoryAlertSubmit(
      buildCategoryAlertFormValues({
        minQuantityText: INVALID_ALERT_TEXT,
        expiryDaysText: INVALID_ALERT_TEXT,
      }),
      mockOnValidationErrors
    );

    const preventDefault =
      await submitCategoryAlertForm(result);

    expect(preventDefault).toHaveBeenCalled();
    expect(mockOnValidationErrors).toHaveBeenCalledWith(
      NOT_INTEGER_ERRORS
    );
    expect(
      mockUpdateCategoryAlertsAction
    ).not.toHaveBeenCalled();
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it.each(SUBMIT_CASES_BY_TYPE)(
    "sends the $description input, shows the success toast and returns to the category list",
    async ({ values, input }) => {
      mockUpdateCategoryAlertsAction.mockResolvedValue(
        SUCCESS_RESULT
      );
      const { result } = renderCategoryAlertSubmit(
        values,
        mockOnValidationErrors
      );

      await submitCategoryAlertForm(result);

      expect(mockOnValidationErrors).toHaveBeenCalledWith(
        {}
      );
      expect(
        mockUpdateCategoryAlertsAction
      ).toHaveBeenCalledWith(input);
      expect(mockShowToast).toHaveBeenCalledWith(
        STATUS.SUCCESS,
        CATEGORY_CATALOG_COPY.ALERT_UPDATE_SUCCESS_TOAST
      );
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith(
        PATHS.ADMINISTRATION.CATEGORIES
      );
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the server message and does not leave the screen when the action returns an error", async () => {
    mockUpdateCategoryAlertsAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.ALERT_CATEGORY_NOT_FOUND_ERROR,
    });
    const { result } = renderCategoryAlertSubmit();

    await submitCategoryAlertForm(result);

    expect(mockShowToast).toHaveBeenCalledWith(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.ALERT_CATEGORY_NOT_FOUND_ERROR
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
