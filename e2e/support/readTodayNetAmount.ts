import type { CurrencyCode } from "@/app/constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { readTodayIncomeDisplays } from "./readTodayIncomeDisplays";

export const readTodayNetAmount = async (
  currency: CurrencyCode
): Promise<number> => {
  const displays = await readTodayIncomeDisplays(
    createServiceRoleClient()
  );
  const display = displays.find(
    (entry) => entry.currency === currency
  );
  if (!display) {
    return 0;
  }

  return display.isNetNegative
    ? -display.net.amount
    : display.net.amount;
};
