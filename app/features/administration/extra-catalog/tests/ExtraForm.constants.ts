import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  STRING,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraFormSubmitOptions } from "../models/ExtraFormSubmitOptions.type";
import type { ExtraFormValues } from "../models/ExtraFormValues.interface";
import type { ExtraFormViewModelProps } from "../models/ExtraFormViewModelProps.type";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraInvalidPriceFieldCase } from "./models/ExtraInvalidPriceFieldCase.interface";
import type { ExtraFormSeedCase } from "./models/ExtraFormSeedCase.interface";
import type { ExtraFormSubmitOverrides } from "./models/ExtraFormSubmitOverrides.interface";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_NAME,
  FAKE_EXTRA_PRICE_USD_TEXT,
} from "./Extra.constants";

export const EDITED_EXTRA_NAME = "Wakeboard";
export const FAKE_NAME_ERROR = "fake-extra-name-error";
export const FAKE_PRICE_ERROR = "fake-extra-price-error";
export const FAKE_SERVER_MESSAGE =
  "fake-extra-server-message";
export const FAKE_ACTION_FAILURE_MESSAGE =
  "fake-extra-action-failure";
export const FAKE_CONTROL_FLOW_SIGNAL_MESSAGE =
  "fake-extra-control-flow-signal";
export const EDITED_EXTRA_PRICE_USD_TEXT = "30.5";
export const INVALID_PRICE_FIELD_CASES: ExtraInvalidPriceFieldCase[] =
  [
    {
      description: "a text amount",
      currency: CURRENCY_CODE.USD,
      text: "abc",
      expectedError: EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
    },
    {
      description: "a negative amount",
      currency: CURRENCY_CODE.CRC,
      text: "-5",
      expectedError: EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
    },
    {
      description: "three decimals",
      currency: CURRENCY_CODE.USD,
      text: "1.234",
      expectedError:
        EXTRA_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.PRECISION
        ],
    },
  ];
export const SUBMISSIONS_AFTER_RELEASE = 2;
export const SUBMISSIONS_WHILE_LOCKED = 1;

export const EXTRA_FORM_SUCCESS_RESULT: ExtraMutationResult =
  { status: EXTRA_MUTATION_STATUS.SUCCESS };

export const EMPTY_EXTRA_FORM_VALUES: ExtraFormValues = {
  name: STRING.Empty,
  priceUsd: STRING.Empty,
  priceCrc: STRING.Empty,
};

export const VALID_EXTRA_FORM_VALUES: ExtraFormValues = {
  name: FAKE_EXTRA_NAME,
  priceUsd: FAKE_EXTRA_PRICE_USD_TEXT,
  priceCrc: STRING.Empty,
};

export const CREATE_FORM_PROPS: ExtraFormViewModelProps = {
  mode: EXTRA_FORM_MODE.CREATE,
};

export const EDIT_FORM_PROPS: ExtraFormViewModelProps = {
  mode: EXTRA_FORM_MODE.EDIT,
  extra: DEFAULT_EXTRA,
};

export const buildExtraFormSubmitOptions = (
  overrides: ExtraFormSubmitOverrides = {},
  props: ExtraFormViewModelProps = CREATE_FORM_PROPS
): ExtraFormSubmitOptions => ({
  ...props,
  values: VALID_EXTRA_FORM_VALUES,
  showErrors: () => undefined,
  ...overrides,
});

export const SEED_CASES: ExtraFormSeedCase[] = [
  {
    props: CREATE_FORM_PROPS,
    values: EMPTY_EXTRA_FORM_VALUES,
  },
  {
    props: EDIT_FORM_PROPS,
    values: VALID_EXTRA_FORM_VALUES,
  },
];
