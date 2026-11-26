import { Text } from "@/app/components";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitStatusJobsProps } from "../models/CategoryUnitStatusJobsProps.interface";
import {
  CATEGORY_UNIT_STATUS_BLOCK_CLASS,
  CATEGORY_UNIT_STATUS_BLOCK_TITLE_CLASS,
  CATEGORY_UNIT_STATUS_JOB_CLASS,
  CATEGORY_UNIT_STATUS_JOB_META_CLASS,
  CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS,
} from "../styles/CategoryUnitStatusSheet.styles";
import { formatStatusDate } from "../utils/formatStatusDate";
import { resolveJobMeta } from "../utils/resolveJobMeta";
import { resolveJobTitle } from "../utils/resolveJobTitle";

const CategoryUnitStatusJobs = ({
  jobs,
}: CategoryUnitStatusJobsProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_STATUS_BLOCK_CLASS}>
    <Text
      className={CATEGORY_UNIT_STATUS_BLOCK_TITLE_CLASS}
    >
      {CATEGORY_UNITS_COPY.STATUS_JOBS_TITLE}
    </Text>
    {jobs.length === 0 ? (
      <Text className={CATEGORY_UNIT_STATUS_JOB_META_CLASS}>
        {CATEGORY_UNITS_COPY.STATUS_JOBS_EMPTY}
      </Text>
    ) : (
      jobs.map((job) => (
        <div
          key={`${job.performedAt}-${job.workType}-${job.description}`}
          className={CATEGORY_UNIT_STATUS_JOB_CLASS}
        >
          <Text
            className={CATEGORY_UNIT_STATUS_JOB_TITLE_CLASS}
          >
            {resolveJobTitle(job)}
          </Text>
          <Text
            className={CATEGORY_UNIT_STATUS_JOB_META_CLASS}
          >
            {formatStatusDate(job.performedAt)}
            {resolveJobMeta(job)}
          </Text>
        </div>
      ))
    )}
  </div>
);

export default CategoryUnitStatusJobs;
