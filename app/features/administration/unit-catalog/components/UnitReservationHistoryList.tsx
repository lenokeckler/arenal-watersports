import UnorderedList from "@/app/components/list/UnorderedList";
import { UNORDERED_LIST } from "@/app/components/list/UnorderedList.constants";
import type { UnitReservationHistoryListProps } from "../models/UnitReservationHistoryListProps.interface";
import UnitReservationHistoryRow from "./UnitReservationHistoryRow";

const UnitReservationHistoryList = ({
  rows,
}: UnitReservationHistoryListProps): React.JSX.Element => (
  <UnorderedList
    variant={UNORDERED_LIST.VARIANTS.PLAIN}
    items={rows.map((row) => ({
      id: row.id,
      text: <UnitReservationHistoryRow {...row} />,
    }))}
  />
);

export default UnitReservationHistoryList;
