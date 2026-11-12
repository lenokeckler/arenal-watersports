import Text from "@/app/components/text/Text";
import { ARIA_ROLE, PAGINATION } from "@/app/constants";
import { WORKER_LIST_COPY } from "../constants/WorkerListCopy.constants";
import type { WorkerListRecordsProps } from "../models/WorkerListRecordsProps.interface";
import {
  WORKER_LIST_CARDS_CLASS,
  WORKER_LIST_EMPTY_CLASS,
  WORKER_LIST_RECORDS_CLASS,
} from "../styles/WorkerList.styles";
import WorkerListCard from "./WorkerListCard";
import WorkerListTable from "./WorkerListTable";

const WorkerListRecords = ({
  rows,
}: WorkerListRecordsProps): React.JSX.Element => {
  if (rows.length === PAGINATION.ZERO_RESULTS) {
    return (
      <Text
        role={ARIA_ROLE.STATUS}
        className={WORKER_LIST_EMPTY_CLASS}
      >
        {WORKER_LIST_COPY.EMPTY}
      </Text>
    );
  }

  return (
    <div className={WORKER_LIST_RECORDS_CLASS}>
      <div className={WORKER_LIST_CARDS_CLASS}>
        {rows.map((row) => (
          <WorkerListCard
            key={row.id}
            row={row}
          />
        ))}
      </div>
      <WorkerListTable rows={rows} />
    </div>
  );
};

export default WorkerListRecords;
