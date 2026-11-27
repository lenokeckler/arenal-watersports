import Text from "@/app/components/text/Text";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSectionProps } from "../models/DamageSectionProps.interface";
import { filterByCause } from "../utils/filterByCause";
import { resolveDamageDayTotalClass } from "../styles/DamageReports.styles";
import DamageReportCard from "./DamageReportCard";
import type { JSX } from "react";

const DamageDayReports = ({
  filters,
  overview,
}: DamageSectionProps): JSX.Element => {
  const reports = filterByCause(
    overview.calendarReports,
    filters.cause
  ).filter((report) => report.date === filters.day);

  return (
    <>
      <Text
        className={resolveDamageDayTotalClass(
          reports.length > 0
        )}
      >
        {reports.length
          ? DAMAGE_REPORTS_COPY.DAY_TOTAL(reports.length)
          : DAMAGE_REPORTS_COPY.DAY_EMPTY}
      </Text>
      {reports.map((report) => (
        <DamageReportCard
          key={report.id}
          report={report}
        />
      ))}
    </>
  );
};

export default DamageDayReports;
