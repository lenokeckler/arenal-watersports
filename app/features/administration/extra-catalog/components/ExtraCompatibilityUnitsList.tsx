import Text from "@/app/components/text/Text";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import type { ExtraCompatibilityUnitsListProps } from "../models/ExtraCompatibilityUnitsListProps.interface";
import {
  EXTRA_COMPATIBILITY_UNITS_EMPTY_CLASS,
  EXTRA_COMPATIBILITY_UNITS_LIST_CLASS,
} from "../styles/ExtraCompatibilityUnits.styles";
import ExtraCompatibilityUnitCheckboxRow from "./ExtraCompatibilityUnitCheckboxRow";

const ExtraCompatibilityUnitsList = ({
  isSubmitting,
  onToggleUnit,
  options,
}: ExtraCompatibilityUnitsListProps): React.JSX.Element =>
  options.length > 0 ? (
    <div className={EXTRA_COMPATIBILITY_UNITS_LIST_CLASS}>
      {options.map((option) => (
        <ExtraCompatibilityUnitCheckboxRow
          key={option.id}
          isSubmitting={isSubmitting}
          onToggleUnit={onToggleUnit}
          option={option}
        />
      ))}
    </div>
  ) : (
    <Text className={EXTRA_COMPATIBILITY_UNITS_EMPTY_CLASS}>
      {EXTRA_COMPATIBILITY_COPY.UNITS_EMPTY}
    </Text>
  );

export default ExtraCompatibilityUnitsList;
