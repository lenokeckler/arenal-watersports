import type { Metadata } from "next";
import { DAILY_INCOME_METADATA } from "@/app/features/reservations/daily-income/constants/DailyIncomeMetadata.constants";
import DailyIncome from "@/app/features/reservations/daily-income/DailyIncome";

export const metadata: Metadata = DAILY_INCOME_METADATA;

const DailyIncomePage = (): React.JSX.Element => (
  <DailyIncome />
);

export default DailyIncomePage;
