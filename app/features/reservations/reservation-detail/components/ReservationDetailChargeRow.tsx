import Text from "@/app/components/text/Text";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailCharge } from "../models/ReservationDetailCharge.interface";
import type { ReservationDetailChargeAmount } from "../models/ReservationDetailChargeAmount.interface";
import type { ReservationDetailChargeRowProps } from "../models/ReservationDetailChargeRowProps.interface";
import {
  RESERVATION_DETAIL_LABEL_CLASS,
  RESERVATION_DETAIL_ROW_CLASS,
} from "../styles/ReservationDetailSections.styles";
import { RESERVATION_DETAIL_MONEY_CLASS } from "../styles/ReservationDetailCharges.styles";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";

const createChargeAmounts = (
  charge: ReservationDetailCharge
): ReservationDetailChargeAmount[] => {
  const amounts: ReservationDetailChargeAmount[] = [
    {
      label: copy.AMOUNT_TARGET,
      value:
        charge.amountTarget === null
          ? copy.MISSING_AMOUNT
          : formatReservationDetailAmount(
              charge.amountTarget,
              charge.currency
            ),
    },
    {
      label: copy.AMOUNT_CHARGED_GROSS,
      value: formatReservationDetailAmount(
        charge.amountChargedGross,
        charge.currency
      ),
    },
    {
      label: copy.AMOUNT_CHARGED_NET,
      value: formatReservationDetailAmount(
        charge.amountChargedNet,
        charge.currency
      ),
    },
  ];

  if (charge.amountRemaining !== null) {
    amounts.push({
      label: copy.AMOUNT_REMAINING,
      value: formatReservationDetailAmount(
        charge.amountRemaining,
        charge.currency
      ),
    });
  }

  if (
    charge.amountCredit !== null &&
    charge.amountCredit > 0
  ) {
    amounts.push({
      label: copy.AMOUNT_CREDIT,
      value: formatReservationDetailAmount(
        charge.amountCredit,
        charge.currency
      ),
    });
  }

  return amounts;
};

const ReservationDetailChargeRow = ({
  charge,
}: ReservationDetailChargeRowProps): React.JSX.Element => {
  const amounts = createChargeAmounts(charge);

  return (
    <div className={RESERVATION_DETAIL_ROW_CLASS}>
      {amounts.map((amount) => (
        <div key={amount.label}>
          <Text className={RESERVATION_DETAIL_LABEL_CLASS}>
            {amount.label}
          </Text>
          <Text className={RESERVATION_DETAIL_MONEY_CLASS}>
            {amount.value}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default ReservationDetailChargeRow;
