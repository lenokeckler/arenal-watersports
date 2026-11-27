import Text from "@/app/components/text/Text";
import {
  RESERVATION_DETAIL_MOVEMENTS_COPY as copy,
  RESERVATION_DETAIL_MOVEMENTS_PANEL_ID,
} from "../constants/ReservationDetailMovementsCopy.constants";
import type { ReservationDetailMoneyMovementsProps } from "../models/ReservationDetailMoneyMovementsProps.interface";
import { RESERVATION_DETAIL_LABEL_CLASS } from "../styles/ReservationDetail.styles";
import { RESERVATION_DETAIL_MOVEMENTS_BLOCK_CLASS } from "../styles/ReservationDetailMoneyMovements.styles";
import { RESERVATION_DETAIL_EMPTY_CLASS } from "../styles/ReservationDetailSections.styles";
import ReservationDetailMoneyMovementsList from "./ReservationDetailMoneyMovementsList";
import ReservationDetailMoneyMovementsToggle from "./ReservationDetailMoneyMovementsToggle";

const ReservationDetailMoneyMovements = ({
  movements,
}: ReservationDetailMoneyMovementsProps): React.JSX.Element => {
  if (movements.length === 0) {
    return (
      <Text className={RESERVATION_DETAIL_EMPTY_CLASS}>
        {copy.MOVEMENTS_EMPTY}
      </Text>
    );
  }

  return (
    <div
      className={RESERVATION_DETAIL_MOVEMENTS_BLOCK_CLASS}
    >
      <Text className={RESERVATION_DETAIL_LABEL_CLASS}>
        {copy.MOVEMENTS_TITLE}
      </Text>
      <ReservationDetailMoneyMovementsToggle
        panelId={RESERVATION_DETAIL_MOVEMENTS_PANEL_ID}
      >
        <ReservationDetailMoneyMovementsList
          movements={movements}
        />
      </ReservationDetailMoneyMovementsToggle>
    </div>
  );
};

export default ReservationDetailMoneyMovements;
