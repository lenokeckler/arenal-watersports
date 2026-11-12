import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import {
  RESERVATION_CHARGE_FIELD_ID,
  RESERVATION_CHARGE_FOCUS,
} from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeFormProps } from "../models/ReservationChargeFormProps.interface";
import {
  RESERVATION_CHARGE_ACTIONS_CLASS,
  RESERVATION_CHARGE_ALERT_CLASS,
  RESERVATION_CHARGE_SECONDARY_LINK_CLASS,
  RESERVATION_CHARGE_SUBMIT_CLASS,
} from "../styles/ReservationChargeForm.styles";
import ReservationChargeAmountField from "./ReservationChargeAmountField";
import ReservationChargeCurrencyField from "./ReservationChargeCurrencyField";
import ReservationChargePaymentMethodField from "./ReservationChargePaymentMethodField";

const ReservationChargeForm = ({
  charge,
  viewModel,
}: ReservationChargeFormProps): React.JSX.Element => (
  <>
    {viewModel.currencyOptions.length > 1 && (
      <ReservationChargeCurrencyField
        charge={charge}
        viewModel={viewModel}
      />
    )}
    <ReservationChargeAmountField
      charge={charge}
      viewModel={viewModel}
    />
    <ReservationChargePaymentMethodField
      viewModel={viewModel}
    />
    {viewModel.formError && (
      <Text
        id={RESERVATION_CHARGE_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_CHARGE_FOCUS.TAB_INDEX}
        className={RESERVATION_CHARGE_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_CHARGE_ACTIONS_CLASS}
    >
      <Button
        type="submit"
        variant={BUTTON.PRIMARY}
        className={RESERVATION_CHARGE_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {viewModel.isPending
          ? COPY.SUBMITTING
          : COPY.SUBMIT}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(charge.id)}
        className={RESERVATION_CHARGE_SECONDARY_LINK_CLASS}
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default ReservationChargeForm;
