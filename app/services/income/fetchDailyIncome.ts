import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { fetchChargesInRange } from "./fetchChargesInRange";
import type { DailyIncome } from "./models/DailyIncome.interface";
import { summarizeIncomeByCurrency } from "./summarizeIncomeByCurrency";

export const fetchDailyIncome = async (
  now: Date = new Date()
): Promise<DailyIncome> => {
  const { date, startsAt, endsAt } =
    getCostaRicaDayRange(now);
  const charges = await fetchChargesInRange({
    startsAt,
    endsAt,
  });
  return {
    date,
    currencies: summarizeIncomeByCurrency(charges),
  };
};
