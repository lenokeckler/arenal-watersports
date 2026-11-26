import { UnorderedList } from "@/app/components";
import type { ReservationDetailMoneyMovementsProps } from "../models/ReservationDetailMoneyMovementsProps.interface";
import { RESERVATION_DETAIL_LIST_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailMoneyMovementRow from "./ReservationDetailMoneyMovementRow";

const ReservationDetailMoneyMovementsList = ({
  movements,
}: ReservationDetailMoneyMovementsProps): React.JSX.Element => (
  <UnorderedList
    className={RESERVATION_DETAIL_LIST_CLASS}
    items={movements.map((movement) => ({
      id: movement.id,
      text: (
        <ReservationDetailMoneyMovementRow
          movement={movement}
        />
      ),
    }))}
  />
);

export default ReservationDetailMoneyMovementsList;
