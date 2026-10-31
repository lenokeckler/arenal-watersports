import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { UNIT_DECOMMISSION_COPY } from "@/app/features/administration/unit-catalog/constants/UnitDecommissionCopy.constants";
import { UNIT_FORM_COPY } from "@/app/features/administration/unit-catalog/constants/UnitFormCopy.constants";
import type { UnitFormMode } from "@/app/features/administration/unit-catalog/constants/UnitFormMode.constants";
import { UNIT_FORM_SUBMIT_LABEL } from "@/app/features/administration/unit-catalog/constants/UnitFormModeCopy.constants";
import type { UnitEffectiveStatus } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { UNIT_STATUS_LABEL } from "@/app/features/administration/unit-catalog/constants/UnitStatusLabel.constants";
import { UNIT_USAGE_FIELD_LABEL } from "@/app/features/administration/unit-catalog/constants/UnitUsageFieldLabel.constants";
import { UNIT_USAGE_METRIC } from "@/app/features/administration/unit-catalog/constants/UnitUsageMetric.constants";
import {
  resolveUnitEditPath,
  resolveUnitNewPath,
} from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import type { UnitFormInput } from "../models/UnitFormInput.interface";

const fillWhenGiven = async (
  field: Locator,
  text?: string
): Promise<void> => {
  if (text !== undefined) {
    await field.fill(text);
  }
};

export const createCategoryUnitFormPage = (page: Page) => {
  const goTo = async (
    categoryId: string,
    unitId?: string
  ): Promise<void> => {
    await page.goto(
      unitId
        ? resolveUnitEditPath(categoryId, unitId)
        : resolveUnitNewPath(categoryId)
    );
  };

  const getCodeInput = (): Locator =>
    page.getByLabel(UNIT_FORM_COPY.CODE_LABEL);

  const getStatusSelect = (): Locator =>
    page.getByLabel(UNIT_FORM_COPY.STATUS_LABEL);

  const getFuelMaxInput = (): Locator =>
    page.getByLabel(UNIT_FORM_COPY.FUEL_MAX_LABEL);

  const getFuelLevelInput = (): Locator =>
    page.getByLabel(UNIT_FORM_COPY.FUEL_LEVEL_LABEL);

  const getUsageInput = (): Locator =>
    page.getByLabel(
      UNIT_USAGE_FIELD_LABEL[UNIT_USAGE_METRIC.ENGINE_HOURS]
    );

  const getNextOilChangeInput = (): Locator =>
    page.getByLabel(UNIT_FORM_COPY.NEXT_OIL_CHANGE_LABEL);

  const getReasonInput = (): Locator =>
    page.getByLabel(UNIT_DECOMMISSION_COPY.REASON_LABEL);

  const getFieldError = (fieldId: string): Locator =>
    page.locator(`#${fieldId}${FIELD_ERROR_ID_SUFFIX}`);

  const getDecommissionedNotice = (): Locator =>
    page.getByText(
      UNIT_DECOMMISSION_COPY.DECOMMISSIONED_NOTICE_PREFIX
    );

  const getToastMessage = (message: string): Locator =>
    page.getByText(message);

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const clickButton = async (
    name: string
  ): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, { name })
      .click();
  };

  const fill = async (
    input: Partial<UnitFormInput>
  ): Promise<void> => {
    await fillWhenGiven(getCodeInput(), input.code);
    await fillWhenGiven(getFuelMaxInput(), input.fuelMax);
    await fillWhenGiven(
      getFuelLevelInput(),
      input.fuelLevel
    );
    await fillWhenGiven(getUsageInput(), input.usageTotal);
    await fillWhenGiven(
      getNextOilChangeInput(),
      input.nextOilChangeAt
    );
  };

  const selectStatus = async (
    status: UnitEffectiveStatus
  ): Promise<void> => {
    await getStatusSelect().selectOption({
      label: UNIT_STATUS_LABEL[status],
    });
  };

  const submit = (mode: UnitFormMode): Promise<void> =>
    clickButton(UNIT_FORM_SUBMIT_LABEL[mode]);

  const cancel = (): Promise<void> =>
    clickButton(UNIT_FORM_COPY.CANCEL_BUTTON);

  const openDecommission = (): Promise<void> =>
    clickButton(UNIT_DECOMMISSION_COPY.OPEN_BUTTON);

  const confirmDecommission = (): Promise<void> =>
    clickButton(UNIT_DECOMMISSION_COPY.CONFIRM_BUTTON);

  const fillReason = async (
    reason: string
  ): Promise<void> => {
    await getReasonInput().fill(reason);
  };

  return {
    goTo,
    getCodeInput,
    getStatusSelect,
    getFuelMaxInput,
    getFuelLevelInput,
    getUsageInput,
    getNextOilChangeInput,
    getReasonInput,
    getFieldError,
    getDecommissionedNotice,
    getToastMessage,
    getNotFoundMessage,
    fill,
    selectStatus,
    submit,
    cancel,
    openDecommission,
    confirmDecommission,
    fillReason,
  };
};
