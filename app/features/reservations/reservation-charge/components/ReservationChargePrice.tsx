import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID as FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { useReservationChargeSecondAmountFocus } from "../hooks/useReservationChargeSecondAmountFocus";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import { RESERVATION_CHARGE_PRICE_BLOCK_CLASS } from "../styles/ReservationCharge.styles";
import ReservationChargeCurrencyField from "./ReservationChargeCurrencyField";
import ReservationChargePriceFields from "./ReservationChargePriceFields";
import ReservationChargeSecondAmountToggle from "./ReservationChargeSecondAmountToggle";

const ReservationChargePrice = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => {
  useReservationChargeSecondAmountFocus(viewModel.isMixed);

  return (
    <div className={RESERVATION_CHARGE_PRICE_BLOCK_CLASS}>
      {!viewModel.isMixed &&
        viewModel.currencyOptions.length > 1 && (
          <ReservationChargeCurrencyField
            charge={charge}
            viewModel={viewModel}
          />
        )}
      <div
        id={FIELD_ID.PRICE_BLOCK}
        role={ARIA_ROLE.GROUP}
        aria-label={COPY.PRICE_GROUP_LABEL}
      >
        <ReservationChargePriceFields
          charge={charge}
          viewModel={viewModel}
        />
      </div>
      <ReservationChargeSecondAmountToggle
        viewModel={viewModel}
      />
    </div>
  );
};

export default ReservationChargePrice;
