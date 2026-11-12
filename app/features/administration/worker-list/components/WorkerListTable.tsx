import {
  WORKER_LIST_COLUMNS,
  WORKER_LIST_COPY,
} from "../constants/WorkerListCopy.constants";
import type { WorkerListRecordsProps } from "../models/WorkerListRecordsProps.interface";
import type { WorkerListTableRowProps } from "../models/WorkerListTableRowProps.interface";
import {
  WORKER_LIST_TABLE_CAPTION_CLASS,
  WORKER_LIST_TABLE_CELL_CLASS,
  WORKER_LIST_TABLE_CLASS,
  WORKER_LIST_TABLE_HEADER_CLASS,
  WORKER_LIST_TABLE_WRAPPER_CLASS,
} from "../styles/WorkerList.styles";

const WorkerListTableRow = ({
  row,
}: WorkerListTableRowProps): React.JSX.Element => (
  <tr>
    <th
      scope="row"
      className={WORKER_LIST_TABLE_CELL_CLASS}
    >
      {row.fullName}
    </th>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.username}
    </td>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.baseRole}
    </td>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.additionalAreas}
    </td>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.marks}
    </td>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.expiresAt}
    </td>
    <td className={WORKER_LIST_TABLE_CELL_CLASS}>
      {row.status}
    </td>
  </tr>
);

const WorkerListTable = ({
  rows,
}: WorkerListRecordsProps): React.JSX.Element => (
  <div className={WORKER_LIST_TABLE_WRAPPER_CLASS}>
    <table className={WORKER_LIST_TABLE_CLASS}>
      <caption className={WORKER_LIST_TABLE_CAPTION_CLASS}>
        {WORKER_LIST_COPY.TITLE}
      </caption>
      <thead>
        <tr>
          {WORKER_LIST_COLUMNS.map((column) => (
            <th
              key={column}
              scope="col"
              className={WORKER_LIST_TABLE_HEADER_CLASS}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <WorkerListTableRow
            key={row.id}
            row={row}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default WorkerListTable;
