import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraOccupancySectionProps } from "../models/ExtraOccupancySectionProps.type";
import {
  EXTRA_FORM_NOTE_CLASS,
  EXTRA_FORM_NOTE_ICON_CLASS,
} from "../styles/ExtraForm.styles";
import {
  EXTRA_OCCUPANCY_LEGEND_CLASS,
  EXTRA_OCCUPANCY_SECTION_CLASS,
} from "../styles/ExtraOccupancy.styles";
import ExtraOccupancyFields from "./ExtraOccupancyFields";
import ExtraOccupancyKindChoices from "./ExtraOccupancyKindChoices";

const ExtraOccupancySection = ({
  values,
  errors,
  isOccupancyEnabled,
  isOccupancyDisabled,
  isOccupancyLocked,
  hasOccupiableCategories,
  occupancyCategoryOptions,
  onOccupancySelect,
  onOccupiesCategoryChange,
  onOccupiesQuantityChange,
  onOccupiesQuantityStep,
}: ExtraOccupancySectionProps): React.JSX.Element => (
  <fieldset className={EXTRA_OCCUPANCY_SECTION_CLASS}>
    <legend className={EXTRA_OCCUPANCY_LEGEND_CLASS}>
      {EXTRA_OCCUPANCY_COPY.KIND_LEGEND}
    </legend>
    {isOccupancyLocked && (
      <div className={EXTRA_FORM_NOTE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.LOCK_RESET}
          className={EXTRA_FORM_NOTE_ICON_CLASS}
        />
        <Text>{EXTRA_OCCUPANCY_COPY.LOCKED_NOTE}</Text>
      </div>
    )}
    <ExtraOccupancyKindChoices
      isOccupancyEnabled={isOccupancyEnabled}
      isOccupancyDisabled={isOccupancyDisabled}
      onOccupancySelect={onOccupancySelect}
    />
    {isOccupancyEnabled && (
      <ExtraOccupancyFields
        values={values}
        errors={errors}
        isOccupancyDisabled={isOccupancyDisabled}
        hasOccupiableCategories={hasOccupiableCategories}
        occupancyCategoryOptions={occupancyCategoryOptions}
        onOccupiesCategoryChange={onOccupiesCategoryChange}
        onOccupiesQuantityChange={onOccupiesQuantityChange}
        onOccupiesQuantityStep={onOccupiesQuantityStep}
      />
    )}
    <FormErrorBanner message={errors.occupancy} />
  </fieldset>
);

export default ExtraOccupancySection;
