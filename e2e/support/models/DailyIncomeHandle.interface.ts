import type { DailyIncomeFixture } from "./DailyIncomeFixture.interface";

export interface DailyIncomeHandle {
  fixture: DailyIncomeFixture;
  remove: () => Promise<void>;
}
