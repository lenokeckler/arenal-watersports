import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { ALERT_TYPE_BY_STORED_VALUES } from "./CategoryAlertCases.constants";
import { buildCategoryAlerts } from "./CategoryAlerts.constants";
import {
  ALERT_FIELD_VISIBILITY_CASES,
  ALERT_TYPE_OPTION_LABELS,
} from "./CategoryAlertsForm.constants";
import { renderCategoryAlertsForm } from "./renderCategoryAlertsForm";
import { SUCCESS_RESULT } from "./useCategoryAlertForm.constants";

const mockPush = vi.fn();
const mockUpdateCategoryAlertsAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryAlertsAction", () => ({
  updateCategoryAlertsAction: (
    input: UpdateCategoryAlertsInput
  ) => mockUpdateCategoryAlertsAction(input),
}));

const expectPresence = (
  field: HTMLElement | null,
  isExpected: boolean
) => {
  if (isExpected) {
    expect(field).toBeInTheDocument();
    return;
  }
  expect(field).not.toBeInTheDocument();
};

describe("CategoryAlertsForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUpdateCategoryAlertsAction.mockReset();
  });

  it("renders the heading and the hint", () => {
    const alertsFormPage = renderCategoryAlertsForm();

    expect(alertsFormPage.getHeading()).toBeInTheDocument();
    expect(alertsFormPage.getHint()).toBeInTheDocument();
  });

  it("offers the four alert types in order", () => {
    const alertsFormPage = renderCategoryAlertsForm();

    expect(alertsFormPage.getTypeOptionLabels()).toEqual(
      ALERT_TYPE_OPTION_LABELS
    );
  });

  it.each(ALERT_TYPE_BY_STORED_VALUES)(
    "prefills the $alertType type with only its own fields",
    (storedCase) => {
      const alertsFormPage = renderCategoryAlertsForm(
        buildCategoryAlerts(storedCase)
      );
      const visibility = ALERT_FIELD_VISIBILITY_CASES.find(
        ({ alertType }) =>
          alertType === storedCase.alertType
      );

      expect(alertsFormPage.getTypeSelect()).toHaveValue(
        storedCase.alertType
      );
      expectPresence(
        alertsFormPage.queryMinQuantityInput(),
        Boolean(visibility?.showsQuantity)
      );
      expectPresence(
        alertsFormPage.queryExpiryDaysInput(),
        Boolean(visibility?.showsExpiry)
      );
    }
  );

  it.each(ALERT_FIELD_VISIBILITY_CASES)(
    "shows the quantity field $showsQuantity and the expiry field $showsExpiry after choosing $alertType",
    async ({ alertType, showsQuantity, showsExpiry }) => {
      const alertsFormPage = renderCategoryAlertsForm();

      await alertsFormPage.selectType(alertType);

      expectPresence(
        alertsFormPage.queryMinQuantityInput(),
        showsQuantity
      );
      expectPresence(
        alertsFormPage.queryExpiryDaysInput(),
        showsExpiry
      );
    }
  );

  it("disables the type, the fields and Cancelar while the submit is in flight", async () => {
    const pendingAction =
      Promise.withResolvers<CategoryMutationResult>();
    mockUpdateCategoryAlertsAction.mockReturnValue(
      pendingAction.promise
    );
    const alertsFormPage = renderCategoryAlertsForm();

    await alertsFormPage.submit();
    await alertsFormPage.waitForSubmitInFlight();

    expect(alertsFormPage.getTypeSelect()).toBeDisabled();
    alertsFormPage.getTextInputs().forEach((input) => {
      expect(input).toBeDisabled();
    });
    expect(alertsFormPage.getCancelButton()).toBeDisabled();

    pendingAction.resolve(SUCCESS_RESULT);
    await alertsFormPage.waitForSubmitSettled();
  });

  it("navigates back to the category list when Cancelar is clicked", async () => {
    const alertsFormPage = renderCategoryAlertsForm();

    await alertsFormPage.cancel();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
