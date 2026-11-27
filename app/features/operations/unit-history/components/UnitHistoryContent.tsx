import type { UnitHistoryJobsProps } from "../models/UnitHistoryJobsProps.interface";
import { UNIT_HISTORY_SPLIT_CLASS } from "../styles/UnitHistory.styles";
import UnitHistoryActions from "./UnitHistoryActions";
import UnitHistoryDamage from "./UnitHistoryDamage";
import UnitHistoryJobs from "./UnitHistoryJobs";
import UnitHistorySummary from "./UnitHistorySummary";
import type { JSX } from "react";

const UnitHistoryContent = ({
  data,
  page,
}: UnitHistoryJobsProps): JSX.Element => (
  <>
    <UnitHistorySummary data={data} />
    <UnitHistoryActions unit={data.unit} />
    <div className={UNIT_HISTORY_SPLIT_CLASS}>
      <UnitHistoryJobs
        data={data}
        page={page}
      />
      <UnitHistoryDamage data={data} />
    </div>
  </>
);

export default UnitHistoryContent;
