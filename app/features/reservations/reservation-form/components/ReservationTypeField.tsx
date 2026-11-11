import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import Text from "@/app/components/text/Text";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_TYPE_FIELDSET_CLASS,
  RESERVATION_TYPE_DESCRIPTION_CLASS,
  RESERVATION_TYPE_GRID_CLASS,
  RESERVATION_TYPE_LEGEND_CLASS,
} from "../styles/ReservationTypeField.styles";
import ReservationTypeOption from "./ReservationTypeOption";

const ReservationTypeField = ({
  viewModel,
}: ReservationFormValuesProps): React.JSX.Element => (
  <fieldset className={RESERVATION_TYPE_FIELDSET_CLASS}>
    <legend className={RESERVATION_TYPE_LEGEND_CLASS}>
      {RESERVATION_TYPE_COPY.LABEL}
    </legend>
    <Text className={RESERVATION_TYPE_DESCRIPTION_CLASS}>
      {RESERVATION_TYPE_COPY.DESCRIPTION}
    </Text>
    <div className={RESERVATION_TYPE_GRID_CLASS}>
      {Object.values(RESERVATION_TYPE_COPY.OPTIONS).map(
        (option) => (
          <ReservationTypeOption
            isSelected={
              viewModel.values.reservationType ===
              option.value
            }
            key={option.value}
            onSelect={viewModel.handleReservationTypeChange}
            description={option.description}
            id={option.id}
            label={option.label}
            value={option.value}
          />
        )
      )}
    </div>
  </fieldset>
);

export default ReservationTypeField;
