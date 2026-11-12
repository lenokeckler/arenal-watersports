import { redirect } from "next/navigation";
import { Text, Title } from "@/app/components";
import {
  ARIA_ROLE,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import MovementBarChart from "./components/MovementBarChart";
import { MOVEMENT_REPORT_COPY } from "./constants/MovementReportCopy.constants";
import type { MovementReportData } from "./models/MovementReportData.interface";
import {
  getMovementReport,
  MovementReportAccessError,
} from "./services/getMovementReport";
import {
  MOVEMENT_REPORT_ERROR_CLASS,
  MOVEMENT_REPORT_HEADING_CLASS,
  MOVEMENT_REPORT_NOTE_CLASS,
  MOVEMENT_REPORT_PAGE_CLASS,
} from "./styles/MovementReport.styles";
import {
  buildMonthDepartureRows,
  buildMonthIncomeRows,
  buildWeekdayDepartureRows,
} from "./utils/buildMovementCharts";

const MovementReport =
  async (): Promise<React.JSX.Element> => {
    let report: MovementReportData | null = null;

    try {
      report = await getMovementReport();
    } catch (error) {
      if (error instanceof MovementReportAccessError) {
        redirect(PATHS.HOME);
      }
    }

    return (
      <main className={MOVEMENT_REPORT_PAGE_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          text={MOVEMENT_REPORT_COPY.HEADING}
          className={MOVEMENT_REPORT_HEADING_CLASS}
        />
        <Text className={MOVEMENT_REPORT_NOTE_CLASS}>
          {MOVEMENT_REPORT_COPY.INTRO}
        </Text>
        {report === null ? (
          <Text
            className={MOVEMENT_REPORT_ERROR_CLASS}
            role={ARIA_ROLE.ALERT}
          >
            {MOVEMENT_REPORT_COPY.ERROR}
          </Text>
        ) : report.departuresByMonth.length === 0 &&
          report.incomeByCurrency.length === 0 ? (
          <Text className={MOVEMENT_REPORT_NOTE_CLASS}>
            {MOVEMENT_REPORT_COPY.EMPTY}
          </Text>
        ) : (
          <>
            <MovementBarChart
              title={
                MOVEMENT_REPORT_COPY.MONTH_DEPARTURES_TITLE
              }
              rows={buildMonthDepartureRows(
                report.departuresByMonth
              )}
            />
            {report.incomeByCurrency.map((series) => (
              <MovementBarChart
                key={series.currency}
                title={MOVEMENT_REPORT_COPY.INCOME_TITLE(
                  series.currency
                )}
                rows={buildMonthIncomeRows(
                  series.currency,
                  series.months
                )}
              />
            ))}
            <MovementBarChart
              title={
                MOVEMENT_REPORT_COPY.WEEKDAY_DEPARTURES_TITLE
              }
              rows={buildWeekdayDepartureRows(
                report.departuresByWeekday
              )}
            />
          </>
        )}
      </main>
    );
  };

export default MovementReport;
