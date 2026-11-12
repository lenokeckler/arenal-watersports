import UnorderedList from "@/app/components/list/UnorderedList";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { ARIA_ROLE, TitleVariant } from "@/app/constants";
import DamageReportCard from "./components/DamageReportCard";
import DamageReportsPagination from "./components/DamageReportsPagination";
import {
  DAMAGE_REPORTS_COPY,
  DAMAGE_REPORTS_HEADING_ID,
} from "./constants/DamageReportsCopy.constants";
import type { DamageReportsViewProps } from "./models/DamageReportsViewProps.interface";
import {
  DAMAGE_REPORTS_CLASS,
  DAMAGE_REPORTS_HEADING_CLASS,
  DAMAGE_REPORTS_LIST_CLASS,
  DAMAGE_REPORTS_MESSAGE_CLASS,
  DAMAGE_REPORTS_UNIT_CLASS,
  DAMAGE_REPORTS_UNIT_DETAIL_CLASS,
} from "./styles/DamageReports.styles";
import type { JSX } from "react";

const DamageReportsView = ({
  entries,
  errorMessage,
  hasNextPage,
  page,
  unit,
}: DamageReportsViewProps): JSX.Element => (
  <main className={DAMAGE_REPORTS_CLASS}>
    <Title
      id={DAMAGE_REPORTS_HEADING_ID}
      variant={TitleVariant.PRIMARY}
      text={DAMAGE_REPORTS_COPY.HEADING}
      className={DAMAGE_REPORTS_HEADING_CLASS}
    />
    {errorMessage && (
      <Text
        className={DAMAGE_REPORTS_MESSAGE_CLASS}
        role={ARIA_ROLE.ALERT}
      >
        {errorMessage}
      </Text>
    )}
    {!errorMessage && !unit && (
      <Text className={DAMAGE_REPORTS_MESSAGE_CLASS}>
        {DAMAGE_REPORTS_COPY.UNIT_NOT_FOUND}
      </Text>
    )}
    {!errorMessage && unit && (
      <>
        <Text className={DAMAGE_REPORTS_UNIT_CLASS}>
          {`${unit.code}${DAMAGE_REPORTS_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
        </Text>
        <Text className={DAMAGE_REPORTS_UNIT_DETAIL_CLASS}>
          {`${DAMAGE_REPORTS_COPY.IMPACTS_TOTAL_PREFIX}${unit.impactCount}`}
        </Text>
        {entries.length === 0 && (
          <Text className={DAMAGE_REPORTS_MESSAGE_CLASS}>
            {DAMAGE_REPORTS_COPY.EMPTY}
          </Text>
        )}
        {entries.length > 0 && (
          <UnorderedList
            className={DAMAGE_REPORTS_LIST_CLASS}
            items={entries.map((entry) => ({
              id: entry.id,
              text: <DamageReportCard entry={entry} />,
            }))}
          />
        )}
        <DamageReportsPagination
          hasNextPage={hasNextPage}
          page={page}
          unitId={unit.id}
        />
      </>
    )}
  </main>
);

export default DamageReportsView;
