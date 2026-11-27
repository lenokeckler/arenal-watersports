import { CURRENCY_NAME_COPY } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import {
  RESERVATION_DEPOSIT_CURRENCY_OPTION_ID,
  RESERVATION_DEPOSIT_CURRENCY_ORDER,
  RESERVATION_DEPOSIT_FIELD_ID as FIELD_ID,
} from "../constants/ReservationDepositUi.constants";
import type { ReservationDepositCurrencyFieldProps } from "../models/ReservationDepositCurrencyFieldProps.interface";
import {
  RESERVATION_DEPOSIT_CHOICE_FIELDSET_CLASS,
  RESERVATION_DEPOSIT_CHOICE_GRID_CLASS,
  RESERVATION_DEPOSIT_CHOICE_LEGEND_CLASS,
  resolveReservationDepositCurrencyOptionClassName,
} from "../styles/ReservationDepositChoice.styles";
import ReservationDepositChoiceOption from "./ReservationDepositChoiceOption";

const ReservationDepositCurrencyField = ({
  currency: selectedCurrency,
  isPending,
  onSelect,
  proposal,
}: ReservationDepositCurrencyFieldProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_DEPOSIT_CHOICE_FIELDSET_CLASS}
  >
    <legend
      className={RESERVATION_DEPOSIT_CHOICE_LEGEND_CLASS}
    >
      {COPY.CURRENCY_LEGEND}
    </legend>
    <div className={RESERVATION_DEPOSIT_CHOICE_GRID_CLASS}>
      {RESERVATION_DEPOSIT_CURRENCY_ORDER.map(
        (currency) => (
          <ReservationDepositChoiceOption
            key={currency}
            className={resolveReservationDepositCurrencyOptionClassName(
              {
                isDisabled: isPending,
                isSelected: selectedCurrency === currency,
              }
            )}
            description={
              proposal[currency] > 0
                ? COPY.CURRENCY_OPTION_DESCRIPTION(
                    formatMoney({
                      amount: proposal[currency],
                      currency,
                    })
                  )
                : COPY.CURRENCY_OPTION_NO_PROPOSAL
            }
            id={RESERVATION_DEPOSIT_CURRENCY_OPTION_ID(
              currency
            )}
            isDisabled={isPending}
            isSelected={selectedCurrency === currency}
            label={CURRENCY_NAME_COPY[currency]}
            name={FIELD_ID.CURRENCY}
            onSelect={() => onSelect(currency)}
          />
        )
      )}
    </div>
  </fieldset>
);

export default ReservationDepositCurrencyField;
