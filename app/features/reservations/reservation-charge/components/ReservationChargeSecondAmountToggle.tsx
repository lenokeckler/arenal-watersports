import { Button } from "@/app/components";
import {
  BUTTON,
  SIZE,
} from "@/app/components/button/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeSecondAmountToggleProps } from "../models/ReservationChargeSecondAmountToggleProps.interface";
import { RESERVATION_CHARGE_ADD_CURRENCY_CLASS } from "../styles/ReservationChargeForm.styles";

const ReservationChargeSecondAmountToggle = ({
  viewModel,
}: ReservationChargeSecondAmountToggleProps): React.JSX.Element => (
  <Button
    type="button"
    id={FIELD_ID.ADD_CURRENCY}
    variant={BUTTON.SECONDARY}
    size={SIZE.NONE}
    className={RESERVATION_CHARGE_ADD_CURRENCY_CLASS}
    disabled={viewModel.isPending}
    aria-expanded={viewModel.isMixed}
    aria-controls={FIELD_ID.PRICE_BLOCK}
    onClick={viewModel.toggleSecondAmount}
  >
    {viewModel.isMixed
      ? COPY.REMOVE_CURRENCY[viewModel.secondCurrency]
      : COPY.ADD_CURRENCY[viewModel.secondCurrency]}
  </Button>
);

export default ReservationChargeSecondAmountToggle;
