import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import {
  fetchDailyIncome,
  isIncomeReaderSignedIn,
} from "@/app/services/income";
import DailyIncomeContent from "./components/DailyIncomeContent";
import { DAILY_INCOME_PAGE_CLASS } from "./styles/DailyIncome.styles";

const DailyIncome =
  async (): Promise<React.JSX.Element> => {
    if (!(await isIncomeReaderSignedIn())) {
      redirect(PATHS.HOME);
    }

    const income = await fetchDailyIncome();

    return (
      <main className={DAILY_INCOME_PAGE_CLASS}>
        <DailyIncomeContent income={income} />
      </main>
    );
  };

export default DailyIncome;
