import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraOccupancyFieldsProps } from "../models/ExtraOccupancyFieldsProps.type";
import { EXTRA_OCCUPANCY_NOTE_CLASS } from "../styles/ExtraOccupancy.styles";

const ExtraOccupancyFields = ({
  values,
  errors,
  isOccupancyDisabled,
  hasOccupiableCategories,
  occupancyCategoryOptions,
  onOccupiesCategoryChange,
  onOccupiesQuantityChange,
}: ExtraOccupancyFieldsProps): React.JSX.Element =>
  hasOccupiableCategories ? (
    <>
      <FormField
        id={EXTRA_FORM_FIELD_ID.OCCUPIES_CATEGORY}
        name={EXTRA_FORM_FIELD_ID.OCCUPIES_CATEGORY}
        label={EXTRA_OCCUPANCY_COPY.CATEGORY_LABEL}
        value={values.occupiesCategoryId}
        type={INPUT_TYPES.SELECT}
        options={occupancyCategoryOptions}
        placeholder={
          EXTRA_OCCUPANCY_COPY.CATEGORY_PLACEHOLDER
        }
        onChange={onOccupiesCategoryChange}
        error={errors.occupancy}
        disabled={isOccupancyDisabled}
      />
      <FormField
        id={EXTRA_FORM_FIELD_ID.OCCUPIES_QUANTITY}
        name={EXTRA_FORM_FIELD_ID.OCCUPIES_QUANTITY}
        label={EXTRA_OCCUPANCY_COPY.QUANTITY_LABEL}
        value={values.occupiesQuantity}
        type={INPUT_TYPES.TEXT}
        inputMode={INPUT_MODE.NUMERIC}
        autoComplete={AUTOCOMPLETE.OFF}
        onChange={onOccupiesQuantityChange}
        error={errors.occupancy}
        disabled={isOccupancyDisabled}
        spellCheck={false}
      />
    </>
  ) : (
    <Text className={EXTRA_OCCUPANCY_NOTE_CLASS}>
      {EXTRA_OCCUPANCY_COPY.NO_CATEGORIES_NOTE}
    </Text>
  );

export default ExtraOccupancyFields;
