import type { CurrencyIncome } from "./CurrencyIncome.interface";

export interface DailyIncome {
  date: string;
  currencies: CurrencyIncome[];
}
