import { CURRENCY_NAME_COPY } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import type { ReservationChargeReceiptPartsProps } from "../models/ReservationChargeReceiptPartsProps.interface";
import { orderReservationChargeRecordedParts } from "../utils/orderReservationChargeRecordedParts";
import ReservationChargeSummaryRow from "./ReservationChargeSummaryRow";

const ReservationChargeReceiptParts = ({
  parts,
}: ReservationChargeReceiptPartsProps): React.JSX.Element => {
  const [single, ...others] = parts;

  if (single && others.length === 0) {
    return (
      <>
        <ReservationChargeSummaryRow
          label={COPY.LABEL_AMOUNT}
          value={formatMoney(single)}
        />
        <ReservationChargeSummaryRow
          label={COPY.LABEL_CURRENCY}
          value={CURRENCY_NAME_COPY[single.currency]}
        />
      </>
    );
  }

  return (
    <>
      {orderReservationChargeRecordedParts(parts).map(
        (part) => (
          <ReservationChargeSummaryRow
            key={part.chargeId}
            label={COPY.LABEL_PART[part.currency]}
            value={formatMoney(part)}
          />
        )
      )}
    </>
  );
};

export default ReservationChargeReceiptParts;
