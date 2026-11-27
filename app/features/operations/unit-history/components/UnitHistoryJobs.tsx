import ListPagination from "@/app/components/list-pagination/ListPagination";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { PATHS, TitleVariant } from "@/app/constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryJobsProps } from "../models/UnitHistoryJobsProps.interface";
import { paginateJobs } from "../utils/paginateJobs";
import { groupJobsByMonth } from "../utils/groupJobsByMonth";
import {
  UNIT_HISTORY_COLUMN_CLASS,
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_SECTION_HEADING_CLASS,
} from "../styles/UnitHistory.styles";
import UnitHistoryMonth from "./UnitHistoryMonth";
import type { JSX } from "react";

const UnitHistoryJobs = ({
  data,
  page,
}: UnitHistoryJobsProps): JSX.Element => {
  const jobPage = paginateJobs(data.jobs, page);

  return (
    <Section className={UNIT_HISTORY_COLUMN_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={UNIT_HISTORY_COPY.JOBS_HEADING}
        className={UNIT_HISTORY_SECTION_HEADING_CLASS}
      />
      {data.jobs.length === 0 && (
        <Text className={UNIT_HISTORY_META_CLASS}>
          {UNIT_HISTORY_COPY.JOBS_EMPTY}
        </Text>
      )}
      {groupJobsByMonth(jobPage.jobs).map((group) => (
        <UnitHistoryMonth
          key={group.month}
          group={group}
        />
      ))}
      <ListPagination
        basePath={PATHS.OPERATIONS.UNIT_HISTORY(
          data.unit.id
        )}
        currentPage={jobPage.currentPage}
        navLabel={UNIT_HISTORY_COPY.JOBS_PAGES_LABEL}
        pageCount={jobPage.pageCount}
      />
    </Section>
  );
};

export default UnitHistoryJobs;
