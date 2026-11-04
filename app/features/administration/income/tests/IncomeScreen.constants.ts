import { CURRENCY_CODE } from "@/app/constants";
import {
  INCOME_REPORT_STATUS,
  type IncomeReportResult,
} from "@/app/services/income-report";
import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";

export const INCOME_DAY: CostaRicaDayRange = {
  date: "2026-10-29",
  startsAt: "2026-10-29T06:00:00.000Z",
  endsAt: "2026-10-30T06:00:00.000Z",
};

export const INCOME_DAY_TEXT =
  "jueves, 29 de octubre de 2026";

export const READY_REPORT: IncomeReportResult = {
  status: INCOME_REPORT_STATUS.READY,
  summaries: [
    {
      currency: CURRENCY_CODE.USD,
      chargedCents: 12050,
      refundedCents: 2000,
      netCents: 10050,
    },
    {
      currency: CURRENCY_CODE.CRC,
      chargedCents: 0,
      refundedCents: 0,
      netCents: 0,
    },
  ],
};

export const EMPTY_REPORT: IncomeReportResult = {
  status: INCOME_REPORT_STATUS.READY,
  summaries: [
    {
      currency: CURRENCY_CODE.USD,
      chargedCents: 0,
      refundedCents: 0,
      netCents: 0,
    },
    {
      currency: CURRENCY_CODE.CRC,
      chargedCents: 0,
      refundedCents: 0,
      netCents: 0,
    },
  ],
};

export const FAILED_REPORT: IncomeReportResult = {
  status: INCOME_REPORT_STATUS.FAILED,
};

export const HEADING_LEVEL_ONE = 1;
export const DATE_TIME_ATTRIBUTE = "datetime";
export const ARIA_BUSY_ATTRIBUTE = "aria-busy";
export const ARIA_BUSY_TRUE = "true";
export const REDIRECT_ERROR_MESSAGE = "redirected";
export const READ_FAILURE_MESSAGE = "read failed";
