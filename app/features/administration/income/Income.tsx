import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readIncomeReport } from "@/app/services/income-report";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import IncomeContent from "./components/IncomeContent";
import IncomeHeader from "./components/IncomeHeader";
import { INCOME_PAGE_CLASS } from "./styles/Income.styles";

const Income = async (): Promise<React.JSX.Element> => {
  if (!(await isAdministratorSignedIn())) {
    redirect(PATHS.HOME);
  }

  const day = getCostaRicaDayRange(new Date());
  const report = await readIncomeReport(day);

  return (
    <main className={INCOME_PAGE_CLASS}>
      <IncomeHeader date={day.date} />
      <IncomeContent report={report} />
    </main>
  );
};

export default Income;
