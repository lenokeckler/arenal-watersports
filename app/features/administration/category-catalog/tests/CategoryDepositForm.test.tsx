import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE, PATHS } from "@/app/constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import { DEPOSIT_FIELD_CURRENCY_ORDER } from "./CategoryDepositForm.constants";
import {
  CATEGORY_DEPOSIT_FIELD_BY_CURRENCY,
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
} from "./CategoryDepositFormValues.constants";
import { renderCategoryDepositForm } from "./renderCategoryDepositForm";
import { SUCCESS_RESULT } from "./useCategoryDepositForm.constants";

const mockPush = vi.fn();
const mockUpdateCategoryDepositAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryDepositAction", () => ({
  updateCategoryDepositAction: (
    input: UpdateCategoryDepositInput
  ) => mockUpdateCategoryDepositAction(input),
}));

describe("CategoryDepositForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUpdateCategoryDepositAction.mockReset();
  });

  it("renders the heading and the hint", () => {
    const depositFormPage = renderCategoryDepositForm();

    expect(
      depositFormPage.getHeading()
    ).toBeInTheDocument();
    expect(depositFormPage.getHint()).toBeInTheDocument();
  });

  it("puts the dollars field before the colones field", () => {
    const depositFormPage = renderCategoryDepositForm();

    expect(depositFormPage.getAmountInputs()).toEqual(
      DEPOSIT_FIELD_CURRENCY_ORDER.map((currency) =>
        depositFormPage.getAmountInput(currency)
      )
    );
  });

  it.each(Object.values(CURRENCY_CODE))(
    "prefills the %s field with the stored amount",
    (currency) => {
      expect(
        renderCategoryDepositForm().getAmountInput(currency)
      ).toHaveValue(
        DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES[
          CATEGORY_DEPOSIT_FIELD_BY_CURRENCY[currency]
        ]
      );
    }
  );

  it("disables both fields and Cancelar while the submit is in flight", async () => {
    const pendingAction =
      Promise.withResolvers<CategoryMutationResult>();
    mockUpdateCategoryDepositAction.mockReturnValue(
      pendingAction.promise
    );
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.submit();
    await depositFormPage.waitForSubmitInFlight();

    depositFormPage.getAmountInputs().forEach((input) => {
      expect(input).toBeDisabled();
    });
    expect(
      depositFormPage.getCancelButton()
    ).toBeDisabled();

    pendingAction.resolve(SUCCESS_RESULT);
    await depositFormPage.waitForSubmitSettled();
  });

  it("navigates back to the category list when Cancelar is clicked", async () => {
    const depositFormPage = renderCategoryDepositForm();

    await depositFormPage.cancel();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
