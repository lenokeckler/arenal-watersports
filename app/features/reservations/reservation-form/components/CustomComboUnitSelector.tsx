import { INPUT_TYPES, STRING } from "@/app/constants";
import { ARIA_ROLE } from "@/app/constants";
import FormField from "@/app/components/form-field/FormField";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import Text from "@/app/components/text/Text";
import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_FORM_INPUT_ID } from "../constants/CustomComboFormCopy.constants";
import type { CustomComboUnitSelectorProps } from "../models/CustomComboUnitSelectorProps.interface";
import {
  RESERVATION_FORM_FIELD_CLASS,
  RESERVATION_FORM_INPUT_CLASS,
  RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS,
} from "../styles/ReservationFormView.styles";

const getAvailabilityMessage = (
  isScheduleValid: boolean,
  isLoading: boolean,
  hasError: boolean,
  availableUnitCount: number
): string => {
  if (!isScheduleValid) {
    return STRING.Empty;
  }
  if (isLoading) {
    return RESERVATION_FORM_UI_COPY.AVAILABILITY_LOADING;
  }
  if (hasError) {
    return RESERVATION_FORM_UI_COPY.AVAILABILITY_ERROR;
  }
  if (availableUnitCount === 0) {
    return RESERVATION_FORM_UI_COPY.NO_AVAILABLE_UNITS;
  }
  return STRING.Empty;
};

const getAvailabilityRole = (
  isLoading: boolean,
  hasError: boolean
): NullableUndefined<
  typeof ARIA_ROLE.STATUS | typeof ARIA_ROLE.ALERT
> => {
  if (isLoading) {
    return ARIA_ROLE.STATUS;
  }
  if (hasError) {
    return ARIA_ROLE.ALERT;
  }
  return undefined;
};

const mapAvailableUnitsToOptions = (
  availableUnits: CustomComboUnitSelectorProps["availableUnits"]
) =>
  availableUnits.map((unit) => ({
    key: unit.id,
    label: unit.code,
    value: unit.id,
  }));

const CustomComboUnitAvailabilityMessage = (
  props: CustomComboUnitSelectorProps
): NullableRef<React.JSX.Element> => {
  const message = getAvailabilityMessage(
    props.isScheduleValid,
    props.isLoading,
    props.hasError,
    props.availableUnits.length
  );
  if (!message) {
    return null;
  }

  return (
    <Text
      role={getAvailabilityRole(
        props.isLoading,
        props.hasError
      )}
      className={RESERVATION_FORM_UNIT_EMPTY_NOTE_CLASS}
    >
      {message}
    </Text>
  );
};

const CustomComboUnitSelectField = ({
  categoryId,
  categoryName,
  availableUnits,
  hasError,
  isLoading,
  isScheduleValid,
  selectedUnitId,
  onChange,
}: CustomComboUnitSelectorProps): React.JSX.Element => {
  const options =
    mapAvailableUnitsToOptions(availableUnits);
  return (
    <FormField
      id={`${CUSTOM_COMBO_FORM_INPUT_ID.UNIT_PREFIX}${categoryId}`}
      name={`${CUSTOM_COMBO_FORM_INPUT_ID.UNIT_PREFIX}${categoryId}`}
      label={`${RESERVATION_FORM_UI_COPY.UNIT}: ${categoryName}`}
      labelSuffix={STRING.Empty}
      classNameField={RESERVATION_FORM_INPUT_CLASS}
      type={INPUT_TYPES.SELECT}
      value={selectedUnitId}
      options={options}
      placeholder={
        RESERVATION_FORM_UI_COPY.UNIT_PLACEHOLDER
      }
      disabled={
        !isScheduleValid ||
        isLoading ||
        hasError ||
        options.length === 0
      }
      onChange={(event) => onChange(event.target.value)}
      variant={FORM_FIELD_VARIANT.GLASS}
    />
  );
};

const CustomComboUnitSelector = (
  props: CustomComboUnitSelectorProps
): React.JSX.Element => (
  <div className={RESERVATION_FORM_FIELD_CLASS}>
    <CustomComboUnitSelectField {...props} />
    <CustomComboUnitAvailabilityMessage {...props} />
  </div>
);

export default CustomComboUnitSelector;
