import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import { RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS } from "../styles/ReservationFormView.styles";

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
    return (
      <Text
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.AVAILABILITY_ERROR}
      </Text>
    );
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
