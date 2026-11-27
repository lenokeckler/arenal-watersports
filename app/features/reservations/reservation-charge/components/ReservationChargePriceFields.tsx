import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import { RESERVATION_CHARGE_PARTS_GRID_CLASS } from "../styles/ReservationCharge.styles";
import ReservationChargeAmountField from "./ReservationChargeAmountField";

const ReservationChargePriceFields = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => (
  <div className={RESERVATION_CHARGE_PARTS_GRID_CLASS}>
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
    {viewModel.secondAmountText !== null && (
      <ReservationChargeAmountField
        currency={viewModel.secondCurrency}
        error={viewModel.errors.secondAmount}
        helperId={FIELD_ID.SECOND_AMOUNT_HELPER}
        id={FIELD_ID.SECOND_AMOUNT}
        isDisabled={viewModel.isPending}
        note={COPY.MIXED_SECOND_HELPER}
        noteId={FIELD_ID.MIXED_HELPER}
        onChange={viewModel.setSecondAmountText}
        proposal={charge.proposal[viewModel.secondCurrency]}
        value={viewModel.secondAmountText}
      />
    )}
  </div>
);

export default ReservationChargePriceFields;
