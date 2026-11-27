import {
  CURRENCY_NAME_COPY,
  CURRENCY_ORDER,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import {
  RESERVATION_EXTRA_TIME_CURRENCY_OPTION_ID,
  RESERVATION_EXTRA_TIME_FIELD_ID,
} from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeFieldProps } from "../models/ReservationExtraTimeFieldProps.interface";
import {
  RESERVATION_EXTRA_TIME_CURRENCY_GRID_CLASS,
  RESERVATION_EXTRA_TIME_FIELDSET_CLASS,
  RESERVATION_EXTRA_TIME_LEGEND_CLASS,
} from "../styles/ReservationExtraTimeForm.styles";
import ReservationExtraTimeOption from "./ReservationExtraTimeOption";

const ReservationExtraTimeCurrencyField = ({
  viewModel,
}: ReservationExtraTimeFieldProps): React.JSX.Element => (
  <fieldset
    className={RESERVATION_EXTRA_TIME_FIELDSET_CLASS}
  >
    <legend className={RESERVATION_EXTRA_TIME_LEGEND_CLASS}>
      {COPY.CURRENCY_LEGEND}
    </legend>
    <div
      className={RESERVATION_EXTRA_TIME_CURRENCY_GRID_CLASS}
    >
      {CURRENCY_ORDER.map((currency) => (
        <ReservationExtraTimeOption
          key={currency}
          id={RESERVATION_EXTRA_TIME_CURRENCY_OPTION_ID(
            currency
          )}
          isChip={false}
          isDisabled={viewModel.isPending}
          isSelected={viewModel.currency === currency}
          label={CURRENCY_NAME_COPY[currency]}
          name={RESERVATION_EXTRA_TIME_FIELD_ID.CURRENCY}
          onSelect={viewModel.setCurrency}
          value={currency}
        />
      ))}
    </div>
  </fieldset>
);

export default ReservationExtraTimeCurrencyField;
