import Text from "@/app/components/text/Text";
import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { Nullable } from "@/app/types/Nullable";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_LABEL_CLASS } from "../styles/ReservationDetail.styles";
import {
  RESERVATION_DETAIL_DEPOSIT_NONE_CLASS,
  RESERVATION_DETAIL_MONEY_CLASS,
} from "../styles/ReservationDetailCharges.styles";
import { RESERVATION_DETAIL_ROW_CLASS } from "../styles/ReservationDetailSections.styles";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";

const ReservationDetailDepositSummary = ({
  detail,
}: ReservationDetailProps): Nullable<React.JSX.Element> => {
  const { deposit } = detail;

  if (
    deposit.kind ===
    RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED
  ) {
    return null;
  }

  return (
    <div className={RESERVATION_DETAIL_ROW_CLASS}>
      <Text className={RESERVATION_DETAIL_LABEL_CLASS}>
        {copy.DEPOSIT}
      </Text>
      {deposit.kind ===
      RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED ? (
        <Text className={RESERVATION_DETAIL_MONEY_CLASS}>
          {formatReservationDetailAmount(
            deposit.amount,
            deposit.currency
          )}
        </Text>
      ) : (
        <Text
          className={RESERVATION_DETAIL_DEPOSIT_NONE_CLASS}
        >
          {copy.DEPOSIT_NONE}
        </Text>
      )}
    </div>
  );
};

export default ReservationDetailDepositSummary;
