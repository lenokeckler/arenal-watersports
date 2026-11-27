import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSpendTableProps } from "../models/MaintenanceSpendTableProps.interface";
import {
  SUMMARY_TABLE_CLASS,
  SUMMARY_TOGGLE_CLASS,
} from "../styles/MaintenanceSummary.styles";
import type { JSX } from "react";

const MaintenanceSpendTable = ({
  bars,
}: MaintenanceSpendTableProps): JSX.Element => (
  <details>
    <summary className={SUMMARY_TOGGLE_CLASS}>
      {MAINTENANCE_COPY.TABLE_TOGGLE}
    </summary>
    <table className={SUMMARY_TABLE_CLASS}>
      <thead>
        <tr>
          <th scope="col">
            {MAINTENANCE_COPY.TABLE_MONTH}
          </th>
          <th scope="col">
            {MAINTENANCE_COPY.TABLE_AMOUNT}
          </th>
        </tr>
      </thead>
      <tbody>
        {bars.map((bar) => (
          <tr key={bar.key}>
            <td>{bar.label}</td>
            <td>{bar.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </details>
);

export default MaintenanceSpendTable;
