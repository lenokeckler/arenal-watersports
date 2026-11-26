import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import {
  AUTOCOMPLETE,
  BUTTON,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import { EXTRA_OCCUPANCY_LIMITS } from "../constants/ExtraOccupancyLimits.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraOccupancyFieldsProps } from "../models/ExtraOccupancyFieldsProps.type";
import { EXTRA_FORM_HELP_CLASS } from "../styles/ExtraForm.styles";
import {
  EXTRA_OCCUPANCY_FIELD_CLASS,
  EXTRA_OCCUPANCY_NOTE_CLASS,
  EXTRA_OCCUPANCY_QUANTITY_FIELD_CLASS,
  EXTRA_OCCUPANCY_QUANTITY_INPUT_CLASS,
  EXTRA_OCCUPANCY_STEP_BUTTON_CLASS,
  EXTRA_OCCUPANCY_STEPPER_CLASS,
} from "../styles/ExtraOccupancy.styles";

const ExtraOccupancyFields = ({
  values,
  errors,
  isOccupancyDisabled,
  hasOccupiableCategories,
  occupancyCategoryOptions,
  onOccupiesCategoryChange,
  onOccupiesQuantityChange,
  onOccupiesQuantityStep,
}: ExtraOccupancyFieldsProps): React.JSX.Element =>
  hasOccupiableCategories ? (
    <>
      <div className={EXTRA_OCCUPANCY_FIELD_CLASS}>
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
          labelSuffix={STRING.Empty}
        />
        <Text className={EXTRA_FORM_HELP_CLASS}>
          {EXTRA_OCCUPANCY_COPY.CATEGORY_HELP}
        </Text>
      </div>
      <div className={EXTRA_OCCUPANCY_FIELD_CLASS}>
        <div className={EXTRA_OCCUPANCY_STEPPER_CLASS}>
          <Button
            variant={BUTTON.BASE}
            type={BUTTON_TYPES.BUTTON}
            aria-label={
              EXTRA_OCCUPANCY_COPY.QUANTITY_DECREASE
            }
            disabled={isOccupancyDisabled}
            onClick={onOccupiesQuantityStep(
              -EXTRA_OCCUPANCY_LIMITS.STEP
            )}
            className={EXTRA_OCCUPANCY_STEP_BUTTON_CLASS}
          >
            <MaterialIcon
              name={MATERIAL_ICON_NAME.REMOVE}
            />
          </Button>
          <div
            className={EXTRA_OCCUPANCY_QUANTITY_FIELD_CLASS}
          >
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
              labelSuffix={STRING.Empty}
              classNameField={
                EXTRA_OCCUPANCY_QUANTITY_INPUT_CLASS
              }
            />
          </div>
          <Button
            variant={BUTTON.BASE}
            type={BUTTON_TYPES.BUTTON}
            aria-label={
              EXTRA_OCCUPANCY_COPY.QUANTITY_INCREASE
            }
            disabled={isOccupancyDisabled}
            onClick={onOccupiesQuantityStep(
              EXTRA_OCCUPANCY_LIMITS.STEP
            )}
            className={EXTRA_OCCUPANCY_STEP_BUTTON_CLASS}
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
          </Button>
        </div>
        <Text className={EXTRA_FORM_HELP_CLASS}>
          {EXTRA_OCCUPANCY_COPY.QUANTITY_HELP}
        </Text>
      </div>
    </>
  ) : (
    <Text className={EXTRA_OCCUPANCY_NOTE_CLASS}>
      {EXTRA_OCCUPANCY_COPY.NO_CATEGORIES_NOTE}
    </Text>
  );

export default ExtraOccupancyFields;
