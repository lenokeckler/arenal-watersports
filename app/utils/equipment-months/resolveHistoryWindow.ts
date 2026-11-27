import { EQUIPMENT_PERIOD } from "@/app/constants";
import { listRecentMonths } from "./listRecentMonths";
import type { HistoryWindow } from "./models/HistoryWindow.interface";
import { toCostaRicaDate } from "./toCostaRicaDate";

export const resolveHistoryWindow = (): HistoryWindow => {
  const today = toCostaRicaDate(new Date());
  const currentMonth = today.slice(
    0,
    EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
  );
  const months = listRecentMonths(
    currentMonth,
    EQUIPMENT_PERIOD.HISTORY_MONTHS
  );

  return {
    currentMonth,
    months,
    since: `${months[0]}${EQUIPMENT_PERIOD.FIRST_DAY_SUFFIX}`,
    today,
  };
};
