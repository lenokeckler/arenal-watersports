import { UnorderedList } from "@/app/components";
import Text from "@/app/components/text/Text";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import type { ReservationDetailAmountEntry } from "../models/ReservationDetailAmountEntry.interface";
import type { ReservationDetailAmountList } from "../models/ReservationDetailAmountList.interface";
import { RESERVATION_DETAIL_ZERO_MINOR_UNITS } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import {
  RESERVATION_DETAIL_LABEL_CLASS,
  RESERVATION_DETAIL_LIST_CLASS,
} from "../styles/ReservationDetailSections.styles";
import { RESERVATION_DETAIL_MONEY_CLASS } from "../styles/ReservationDetailCharges.styles";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";

const renderAmountList = ({
  amounts,
  title,
}: ReservationDetailAmountList): React.JSX.Element => (
  <div className={RESERVATION_DETAIL_LIST_CLASS}>
    <Text className={RESERVATION_DETAIL_LABEL_CLASS}>
      {title}
    </Text>
    <UnorderedList
      className={RESERVATION_DETAIL_LIST_CLASS}
      items={amounts.map((entry) => ({
        id: entry.currency,
        text: (
          <Text className={RESERVATION_DETAIL_MONEY_CLASS}>
            {formatReservationDetailAmount(
              entry.amount,
              entry.currency
            )}
          </Text>
        ),
      }))}
    />
  </div>
);

const ReservationDetailOtherAmounts = ({
  detail,
}: ReservationDetailProps): React.JSX.Element => {
  const extraTimeCharges: ReservationDetailAmountEntry[] =
    detail.extraTimeCharges
      .filter(
        (charge) =>
          charge.amountCharged >
          RESERVATION_DETAIL_ZERO_MINOR_UNITS
      )
      .map((charge) => ({
        amount: charge.amountCharged,
        currency: charge.currency,
      }));
  const refunds: ReservationDetailAmountEntry[] =
    detail.refunds.filter(
      (refund) =>
        refund.amount > RESERVATION_DETAIL_ZERO_MINOR_UNITS
    );

  return (
    <>
      {extraTimeCharges.length === 0
        ? null
        : renderAmountList({
            amounts: extraTimeCharges,
            title: copy.EXTRA_TIME_CHARGES,
          })}
      {refunds.length === 0
        ? null
        : renderAmountList({
            amounts: refunds,
            title: copy.REFUNDS,
          })}
    </>
  );
};

export default ReservationDetailOtherAmounts;
