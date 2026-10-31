import type { ChargeRange } from "../models/ChargeRange.type";
import type { DailyIncome } from "../models/DailyIncome.interface";
import { EXPECTED_MIXED_SUMMARY } from "./Income.constants";

export const NOW_IN_COSTA_RICA_EVENING = new Date(
  "2026-10-29T02:30:00.000Z"
);

export const EXPECTED_TODAY_RANGE: ChargeRange = {
  startsAt: "2026-10-28T06:00:00.000Z",
  endsAt: "2026-10-29T06:00:00.000Z",
};

export const EXPECTED_MIXED_DAY: DailyIncome = {
  date: "2026-10-28",
  currencies: EXPECTED_MIXED_SUMMARY,
};
