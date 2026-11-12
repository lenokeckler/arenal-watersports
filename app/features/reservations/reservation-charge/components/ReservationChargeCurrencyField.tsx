import { CURRENCY_NAME_COPY } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_CURRENCY_OPTION_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import {
  RESERVATION_CHARGE_CURRENCY_FIELDSET_CLASS,
  RESERVATION_CHARGE_CURRENCY_GRID_CLASS,
  RESERVATION_CHARGE_CURRENCY_LEGEND_CLASS,
} from "../styles/ReservationChargeCurrency.styles";
import { formatReservationChargeProposal } from "../utils/formatReservationChargeProposal";
import ReservationChargeCurrencyOption from "./ReservationChargeCurrencyOption";

const ReservationChargeCurrencyField = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_CHARGE_CURRENCY_FIELDSET_CLASS}
  >
    <legend
      className={RESERVATION_CHARGE_CURRENCY_LEGEND_CLASS}
    >
      {COPY.CURRENCY_LEGEND}
    </legend>
    <div className={RESERVATION_CHARGE_CURRENCY_GRID_CLASS}>
      {viewModel.currencyOptions.map((currency) => (
        <ReservationChargeCurrencyOption
          key={currency}
          description={formatReservationChargeProposal(
            charge.proposal[currency],
            currency
          )}
          id={RESERVATION_CHARGE_CURRENCY_OPTION_ID(
            currency
          )}
          isDisabled={viewModel.isPending}
          isSelected={viewModel.currency === currency}
          label={CURRENCY_NAME_COPY[currency]}
          onSelect={viewModel.setCurrency}
          value={currency}
        />
      ))}
    </div>
  </fieldset>
);

export default ReservationChargeCurrencyField;
