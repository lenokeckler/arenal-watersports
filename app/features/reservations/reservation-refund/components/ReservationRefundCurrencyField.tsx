import { CURRENCY_NAME_COPY } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_CURRENCY_OPTION_ID } from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundCurrencyFieldProps } from "../models/ReservationRefundCurrencyFieldProps.interface";
import {
  RESERVATION_REFUND_CURRENCY_FIELDSET_CLASS,
  RESERVATION_REFUND_CURRENCY_GRID_CLASS,
  RESERVATION_REFUND_CURRENCY_LEGEND_CLASS,
} from "../styles/ReservationRefundChoice.styles";
import { resolveReservationRefundAvailable } from "../utils/resolveReservationRefundAvailable";
import ReservationRefundCurrencyOption from "./ReservationRefundCurrencyOption";

const ReservationRefundCurrencyField = ({
  currency: selectedCurrency,
  currencyOptions,
  isPending,
  onSelect,
  refundable,
}: ReservationRefundCurrencyFieldProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_REFUND_CURRENCY_FIELDSET_CLASS}
  >
    <legend
      className={RESERVATION_REFUND_CURRENCY_LEGEND_CLASS}
    >
      {COPY.CURRENCY_LEGEND}
    </legend>
    <div className={RESERVATION_REFUND_CURRENCY_GRID_CLASS}>
      {currencyOptions.map((currency) => (
        <ReservationRefundCurrencyOption
          key={currency}
          description={COPY.CURRENCY_OPTION_DESCRIPTION(
            formatMoney({
              amount: resolveReservationRefundAvailable(
                refundable,
                currency
              ),
              currency,
            })
          )}
          id={RESERVATION_REFUND_CURRENCY_OPTION_ID(
            currency
          )}
          isDisabled={isPending}
          isSelected={selectedCurrency === currency}
          label={CURRENCY_NAME_COPY[currency]}
          onSelect={onSelect}
          value={currency}
        />
      ))}
    </div>
  </fieldset>
);

export default ReservationRefundCurrencyField;
