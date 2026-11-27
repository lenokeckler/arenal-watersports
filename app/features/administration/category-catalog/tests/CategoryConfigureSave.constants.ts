import { LENGTH, STATUS, STRING } from "@/app/constants";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";
import type { CategoryConfigureDraft } from "../models/CategoryConfigureDraft.interface";
import type { CategoryEditedValues } from "../models/CategoryEditedValues.interface";
import type { UpdateCategoryConfigurationInput } from "../models/UpdateCategoryConfigurationInput.interface";
import {
  DEFAULT_CATEGORY_ALERT_FORM_VALUES,
  DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT,
} from "./CategoryAlerts.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import { NEGATIVE_ALERT_TEXT } from "./CategoryConfigureValues.constants";
import {
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
} from "./CategoryDepositFormValues.constants";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";
import { DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT } from "./UpdateCategoryBehaviorInput.constants";
import { DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT } from "./UpdateCategoryDepositInput.constants";

export const BASELINE_EDITED_VALUES: CategoryEditedValues =
  {
    behavior: VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    deposit: DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
    alerts: DEFAULT_CATEGORY_ALERT_FORM_VALUES,
  };

export const BASELINE_DRAFT: CategoryConfigureDraft = {
  values: BASELINE_EDITED_VALUES,
  pickedFile: null,
  isActive: true,
};

export const buildDraft = (
  overrides: Partial<CategoryConfigureDraft> = {}
): CategoryConfigureDraft => ({
  ...BASELINE_DRAFT,
  ...overrides,
});

export const buildEditedValues = (
  overrides: Partial<CategoryEditedValues> = {}
): CategoryEditedValues => ({
  ...BASELINE_EDITED_VALUES,
  ...overrides,
});

export const ONE_FLAG_EDITED_VALUES: CategoryEditedValues =
  buildEditedValues({
    behavior: {
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      guideOnly: true,
    },
  });

export const CHANGED_VALUES_CASES = [
  {
    description: "nothing changed",
    values: BASELINE_EDITED_VALUES,
    expected: LENGTH.ZERO,
  },
  {
    description: "one reservation flag",
    values: ONE_FLAG_EDITED_VALUES,
    expected: LENGTH.ONE,
  },
  {
    description: "a trait and a reservation field",
    values: buildEditedValues({
      behavior: {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        hasConditionPhotos: true,
        defaultDurationMinutes: STRING.Empty,
      },
    }),
    expected: LENGTH.TWO,
  },
  {
    description: "one field of the deposit and the alerts",
    values: buildEditedValues({
      deposit: {
        ...DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
        depositUsd: STRING.Empty,
      },
      alerts: {
        ...DEFAULT_CATEGORY_ALERT_FORM_VALUES,
        alertType: CATEGORY_ALERT_TYPE.NONE,
      },
    }),
    expected: LENGTH.TWO,
  },
];

export const INVALID_EDITED_VALUES: CategoryEditedValues = {
  behavior: {
    ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    defaultDurationMinutes: STRING.Empty,
  },
  deposit: {
    ...DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
    depositUsd: INVALID_FORMAT_TEXT,
  },
  alerts: {
    ...DEFAULT_CATEGORY_ALERT_FORM_VALUES,
    minQuantityText: NEGATIVE_ALERT_TEXT,
  },
};

export const INVALID_FIELD_COUNT = LENGTH.THREE;

export const SAVED_STEP_FEEDBACK = {
  status: STATUS.SUCCESS,
  message: CATEGORY_CONFIGURE_SAVE_COPY.SAVED,
};

export const FAILED_STEP_FEEDBACK = {
  status: STATUS.ERROR,
  message: CATEGORY_CONFIGURE_SAVE_COPY.FAILED,
};

export const FAKE_FIELD_ERROR = "Fake field error";

export const NO_CONFIGURATION_ERRORS: CategoryConfigurationErrors =
  { behavior: {}, deposit: {}, alerts: {} };

export const buildConfigurationErrors = (
  overrides: Partial<CategoryConfigurationErrors> = {}
): CategoryConfigurationErrors => ({
  ...NO_CONFIGURATION_ERRORS,
  ...overrides,
});

export const DEFAULT_UPDATE_CATEGORY_CONFIGURATION_INPUT: UpdateCategoryConfigurationInput =
  {
    categoryId: FAKE_CATEGORY_ID,
    behavior: DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
    deposit: DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT,
    alerts: DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT,
  };
