import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorFormFieldsProps } from "../models/CategoryBehaviorFormFieldsProps.interface";
import CategoryBehaviorCheckboxField from "./CategoryBehaviorCheckboxField";
import CategoryBehaviorDurationField from "./CategoryBehaviorDurationField";
import CategoryBehaviorUsageMetricField from "./CategoryBehaviorUsageMetricField";

const CategoryBehaviorFormFields = ({
  values,
  errors,
  availability,
  isSubmitting,
  onIsReservableChange,
  onUnitsAreInterchangeableChange,
  onHasMotorChange,
  onUsageMetricChange,
  onConsumesFuelChange,
  onCanBeDamagedChange,
  onHasConditionPhotosChange,
  onGuideOnlyChange,
  onDefaultDurationMinutesChange,
}: CategoryBehaviorFormFieldsProps): React.JSX.Element => (
  <>
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.IS_RESERVABLE}
      label={
        CATEGORY_CATALOG_COPY.IS_RESERVABLE_FIELD_LABEL
      }
      checked={values.isReservable}
      disabled={isSubmitting}
      onChange={onIsReservableChange}
    />
    <CategoryBehaviorCheckboxField
      id={
        CATEGORY_BEHAVIOR_FORM_FIELD_ID.UNITS_ARE_INTERCHANGEABLE
      }
      label={
        CATEGORY_CATALOG_COPY.UNITS_ARE_INTERCHANGEABLE_FIELD_LABEL
      }
      checked={values.unitsAreInterchangeable}
      disabled={isSubmitting}
      onChange={onUnitsAreInterchangeableChange}
    />
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.HAS_MOTOR}
      label={CATEGORY_CATALOG_COPY.HAS_MOTOR_FIELD_LABEL}
      checked={values.hasMotor}
      disabled={isSubmitting}
      onChange={onHasMotorChange}
    />
    <CategoryBehaviorUsageMetricField
      value={values.usageMetric}
      disabled={
        isSubmitting || !availability.isUsageMetricEnabled
      }
      onChange={onUsageMetricChange}
    />
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.CONSUMES_FUEL}
      label={
        CATEGORY_CATALOG_COPY.CONSUMES_FUEL_FIELD_LABEL
      }
      checked={values.consumesFuel}
      disabled={isSubmitting}
      onChange={onConsumesFuelChange}
    />
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.CAN_BE_DAMAGED}
      label={
        CATEGORY_CATALOG_COPY.CAN_BE_DAMAGED_FIELD_LABEL
      }
      checked={values.canBeDamaged}
      disabled={isSubmitting}
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
      disabled={
        isSubmitting ||
        !availability.isConditionPhotosEnabled
      }
      onChange={onHasConditionPhotosChange}
    />
    <CategoryBehaviorCheckboxField
      id={CATEGORY_BEHAVIOR_FORM_FIELD_ID.GUIDE_ONLY}
      label={CATEGORY_CATALOG_COPY.GUIDE_ONLY_FIELD_LABEL}
      checked={values.guideOnly}
      disabled={isSubmitting}
      onChange={onGuideOnlyChange}
    />
    <CategoryBehaviorDurationField
      value={values.defaultDurationMinutes}
      error={errors.defaultDurationMinutes}
      disabled={isSubmitting}
      onChange={onDefaultDurationMinutesChange}
    />
  </>
);

export default CategoryBehaviorFormFields;
