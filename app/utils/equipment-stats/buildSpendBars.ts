import type { SpendBar } from "@/app/components/spend-chart/models/SpendBar.interface";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  formatMonthName,
  formatShortMonth,
} from "@/app/utils/equipment-months/formatEquipmentDates";
import type { SpendBarsInput } from "./models/SpendBarsInput.interface";
import { sumJobCost } from "./sumJobCost";

export const buildSpendBars = ({
  currency,
  currentMonth,
  jobs,
  months,
  resolveHref,
}: SpendBarsInput): SpendBar[] =>
  months.map((month) => {
    const amount = sumJobCost(
      jobs.filter((job) => job.date.startsWith(month)),
      currency
    );

    return {
      amount,
      href: resolveHref(month),
      isCurrent: month === currentMonth,
      key: month,
      label: formatMonthName(month),
      shortLabel: formatShortMonth(month),
      text: formatMoney({ amount, currency }),
    };
  });
