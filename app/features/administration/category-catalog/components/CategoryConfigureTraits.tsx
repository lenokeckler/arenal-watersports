import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryConfigureTraitsProps } from "../models/CategoryConfigureTraitsProps.interface";
import { CATEGORY_CONFIGURE_BODY_CLASS } from "../styles/CategoryConfigureBody.styles";
import CategoryBehaviorCheckboxField from "./CategoryBehaviorCheckboxField";
import CategoryBehaviorLowFuelField from "./CategoryBehaviorLowFuelField";
import CategoryBehaviorUsageMetricField from "./CategoryBehaviorUsageMetricField";

const CategoryConfigureTraits = ({
  values,
  errors,
  availability,
  onUnitsAreInterchangeableChange,
  onHasMotorChange,
  onUsageMetricChange,
  onConsumesFuelChange,
  onLowFuelLinesChange,
  onCanBeDamagedChange,
  onHasConditionPhotosChange,
}: CategoryConfigureTraitsProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.HAS_MOTOR}
      label={CATEGORY_CATALOG_COPY.HAS_MOTOR_FIELD_LABEL}
      checked={values.hasMotor}
      onChange={onHasMotorChange}
    />
    <CategoryBehaviorUsageMetricField
      value={values.usageMetric}
      disabled={!availability.isUsageMetricEnabled}
      onChange={onUsageMetricChange}
    />
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.CONSUMES_FUEL}
      label={
        CATEGORY_CATALOG_COPY.CONSUMES_FUEL_FIELD_LABEL
      }
      checked={values.consumesFuel}
      onChange={onConsumesFuelChange}
    />
    {values.consumesFuel && (
      <CategoryBehaviorLowFuelField
        value={values.lowFuelLines}
        error={errors.lowFuelLines}
        onChange={onLowFuelLinesChange}
      />
    )}
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.CAN_BE_DAMAGED}
      label={
        CATEGORY_CATALOG_COPY.CAN_BE_DAMAGED_FIELD_LABEL
      }
      checked={values.canBeDamaged}
      onChange={onCanBeDamagedChange}
    />
    <CategoryBehaviorCheckboxField
      id={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.HAS_CONDITION_PHOTOS
      }
      label={
        CATEGORY_CATALOG_COPY.HAS_CONDITION_PHOTOS_FIELD_LABEL
      }
      checked={values.hasConditionPhotos}
      disabled={!availability.isConditionPhotosEnabled}
      onChange={onHasConditionPhotosChange}
    />
    <CategoryBehaviorCheckboxField
      id={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.UNITS_ARE_INTERCHANGEABLE
      }
      label={
        CATEGORY_CATALOG_COPY.UNITS_ARE_INTERCHANGEABLE_FIELD_LABEL
      }
      checked={values.unitsAreInterchangeable}
      onChange={onUnitsAreInterchangeableChange}
    />
  </div>
);

export default CategoryConfigureTraits;
