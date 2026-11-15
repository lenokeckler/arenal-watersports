import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import { RESERVATION_CHARGE_PRICE_BLOCK_CLASS } from "../styles/ReservationCharge.styles";
import ReservationChargeAmountField from "./ReservationChargeAmountField";
import ReservationChargeCurrencyField from "./ReservationChargeCurrencyField";

const ReservationChargePrice = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => (
  <div className={RESERVATION_CHARGE_PRICE_BLOCK_CLASS}>
    {viewModel.currencyOptions.length > 1 && (
      <ReservationChargeCurrencyField
        charge={charge}
        viewModel={viewModel}
      />
    )}
    <ReservationChargeAmountField
      currency={viewModel.currency}
      error={viewModel.errors.amount}
      helperId={FIELD_ID.AMOUNT_HELPER}
      id={FIELD_ID.AMOUNT}
      isDisabled={viewModel.isPending}
      onChange={viewModel.setAmountText}
      proposal={charge.proposal[viewModel.currency]}
      value={viewModel.amountText}
    />
  </div>
);

export default ReservationChargePrice;
