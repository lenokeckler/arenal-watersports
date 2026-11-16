import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import FormField from "@/app/components/form-field/FormField";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { INPUT_TYPES } from "@/app/constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { EXTRA_FORM_FIELD_ID } from "../constants/ExtraFormFieldId.constants";
import type { ExtraOccupancySectionProps } from "../models/ExtraOccupancySectionProps.type";
import {
  EXTRA_OCCUPANCY_NOTE_CLASS,
  EXTRA_OCCUPANCY_SECTION_CLASS,
  EXTRA_OCCUPANCY_TOGGLE_CLASS,
} from "../styles/ExtraOccupancy.styles";
import ExtraOccupancyFields from "./ExtraOccupancyFields";

const ExtraOccupancySection = ({
  values,
  errors,
  isOccupancyEnabled,
  isOccupancyDisabled,
  isOccupancyLocked,
  hasOccupiableCategories,
  occupancyCategoryOptions,
  onOccupancyToggle,
  onOccupiesCategoryChange,
  onOccupiesQuantityChange,
}: ExtraOccupancySectionProps): React.JSX.Element => (
  <div className={EXTRA_OCCUPANCY_SECTION_CLASS}>
    <SectionTitle
      text={EXTRA_OCCUPANCY_COPY.SECTION_TITLE}
    />
    <div className={EXTRA_OCCUPANCY_TOGGLE_CLASS}>
      <FormField
        id={EXTRA_FORM_FIELD_ID.OCCUPANCY_TOGGLE}
        name={EXTRA_FORM_FIELD_ID.OCCUPANCY_TOGGLE}
        label={EXTRA_OCCUPANCY_COPY.TOGGLE_LABEL}
        value={EXTRA_OCCUPANCY_COPY.TOGGLE_LABEL}
        type={INPUT_TYPES.CHECKBOX}
        checked={isOccupancyEnabled}
        onChange={onOccupancyToggle}
        disabled={isOccupancyDisabled}
      />
    </div>
    {isOccupancyLocked && (
      <Text className={EXTRA_OCCUPANCY_NOTE_CLASS}>
        {EXTRA_OCCUPANCY_COPY.LOCKED_NOTE}
      </Text>
    )}
    {isOccupancyEnabled && (
      <ExtraOccupancyFields
        values={values}
        errors={errors}
        isOccupancyDisabled={isOccupancyDisabled}
        hasOccupiableCategories={hasOccupiableCategories}
        occupancyCategoryOptions={occupancyCategoryOptions}
        onOccupiesCategoryChange={onOccupiesCategoryChange}
        onOccupiesQuantityChange={onOccupiesQuantityChange}
      />
    )}
    <FormErrorBanner message={errors.occupancy} />
  </div>
);

export default ExtraOccupancySection;
