import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import Label from "@/app/components/text/Label";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationFormValuesProps } from "../models/ReservationFormValuesProps.interface";
import {
  RESERVATION_TYPE_FIELDSET_CLASS,
  RESERVATION_TYPE_DESCRIPTION_CLASS,
  RESERVATION_TYPE_GRID_CLASS,
  RESERVATION_TYPE_LEGEND_CLASS,
  RESERVATION_TYPE_RADIO_CLASS,
  RESERVATION_TYPE_OPTION_DESCRIPTION_CLASS,
  RESERVATION_TYPE_OPTION_LABEL_CLASS,
  resolveReservationTypeOptionClassName,
} from "../styles/ReservationTypeField.styles";

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
        (option) => {
          const isSelected =
            viewModel.values.reservationType ===
            option.value;

          return (
            <Label
              className={resolveReservationTypeOptionClassName(
                isSelected
              )}
              htmlFor={option.id}
              key={option.value}
            >
              <input
                checked={isSelected}
                className={RESERVATION_TYPE_RADIO_CLASS}
                id={option.id}
                name={
                  RESERVATION_FORM_FIELD.RESERVATION_TYPE
                }
                onChange={() =>
                  viewModel.handleReservationTypeChange(
                    option.value
                  )
                }
                type="radio"
                value={option.value}
              />
              <InlineText
                className={
                  RESERVATION_TYPE_OPTION_LABEL_CLASS
                }
              >
                {option.label}
              </InlineText>
              <InlineText
                className={
                  RESERVATION_TYPE_OPTION_DESCRIPTION_CLASS
                }
              >
                {option.description}
              </InlineText>
            </Label>
          );
        }
      )}
    </div>
  </fieldset>
);

export default ReservationTypeField;
