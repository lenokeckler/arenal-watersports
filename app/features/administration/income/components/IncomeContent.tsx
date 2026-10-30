import { INCOME_REPORT_STATUS } from "@/app/services/income-report";
import type { IncomeContentProps } from "../models/IncomeContentProps.interface";
import { INCOME_SECTIONS_CLASS } from "../styles/Income.styles";
import { toCurrencyIncomeDisplay } from "../utils/toCurrencyIncomeDisplay";
import IncomeCurrencySection from "./IncomeCurrencySection";
import IncomeEmpty from "./IncomeEmpty";
import IncomeError from "./IncomeError";

const IncomeContent = ({
  report,
}: IncomeContentProps): React.JSX.Element => {
  if (report.status === INCOME_REPORT_STATUS.FAILED) {
    return <IncomeError />;
  }

  const displays = report.summaries.map(
    toCurrencyIncomeDisplay
  );

  if (!displays.some((display) => display.hasMovement)) {
    return <IncomeEmpty />;
  }

  return (
    <div className={INCOME_SECTIONS_CLASS}>
      {displays.map((display) => (
        <IncomeCurrencySection
          key={display.currency}
          display={display}
        />
      ))}
    </div>
  );
};

export default IncomeContent;
