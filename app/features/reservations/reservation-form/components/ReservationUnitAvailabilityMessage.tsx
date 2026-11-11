import Text from "@/app/components/text/Text";
import Button from "@/app/components/button/Button";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_FORM_RETRY_CLASS,
  RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS,
} from "../styles/ReservationFormView.styles";

const AvailabilityError = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <>
    <Text
      role={ARIA_ROLE.ALERT}
      className={RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS}
    >
      {RESERVATION_FORM_UI_COPY.AVAILABILITY_ERROR}
    </Text>
    <Button
      type="button"
      variant={BUTTON.BASE}
      className={RESERVATION_FORM_RETRY_CLASS}
      onClick={viewModel.retryUnitAvailability}
    >
      {RESERVATION_FORM_UI_COPY.RETRY_AVAILABILITY}
    </Button>
  </>
);

const ReservationUnitAvailabilityMessage = ({
  viewModel,
}: ReservationFormValuesProps): NullableRef<React.JSX.Element> => {
  if (viewModel.isAvailabilityLoading) {
    return (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.AVAILABILITY_LOADING}
      </Text>
    );
  }

  if (viewModel.hasAvailabilityError) {
    return <AvailabilityError viewModel={viewModel} />;
  }

  if (viewModel.availableUnits.length > 0) {
    return null;
  }

  return (
    <Text
      className={RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS}
    >
      {RESERVATION_FORM_UI_COPY.NO_AVAILABLE_UNITS}
    </Text>
  );
};

export default ReservationUnitAvailabilityMessage;
