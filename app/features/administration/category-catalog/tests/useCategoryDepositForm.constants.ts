import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryDepositFieldHandlers } from "../models/CategoryDepositFieldHandlers.interface";
import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";

export const SUCCESS_RESULT = {
  status: CATEGORY_MUTATION_STATUS.SUCCESS,
};

export const FAKE_ACTION_FAILURE_MESSAGE =
  "fake-deposit-action-failure";
export const FAKE_CONTROL_FLOW_SIGNAL_MESSAGE =
  "fake-control-flow-signal";
export const EDITED_DEPOSIT_CRC_TEXT = "150000";
export const EDITED_DEPOSIT_CRC_AMOUNT = 150000;
export const SUBMISSIONS_AFTER_RELEASE = 2;
export const PADDED_DEPOSIT_AMOUNT = 200;

export const FORMAT_ERRORS: CategoryDepositFormErrors = {
  depositCrc:
    CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.CRC][
      MONEY_AMOUNT_ISSUE.FORMAT
    ],
  depositUsd:
    CATEGORY_DEPOSIT_ERROR_COPY[CURRENCY_CODE.USD][
      MONEY_AMOUNT_ISSUE.FORMAT
    ],
};

export const CHANGE_HANDLER_BY_CURRENCY: Record<
  CurrencyCode,
  keyof CategoryDepositFieldHandlers
> = {
  [CURRENCY_CODE.CRC]: "onDepositCrcChange",
  [CURRENCY_CODE.USD]: "onDepositUsdChange",
};
