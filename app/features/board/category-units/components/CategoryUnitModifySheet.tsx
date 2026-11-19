"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import CountStepper from "@/app/components/count-stepper/CountStepper";
import FormField from "@/app/components/form-field/FormField";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  CATEGORY_UNIT_FIELD_ID,
  CATEGORY_UNIT_LIMITS,
} from "../constants/CategoryUnits.constants";
import {
  CATEGORY_UNIT_MODIFY_USAGE_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import { useCategoryUnitModify } from "../hooks/useCategoryUnitModify";
import type { CategoryUnitModifySheetProps } from "../models/CategoryUnitModifySheetProps.interface";
import {
  CATEGORY_UNIT_SHEET_ALERT_CLASS,
  CATEGORY_UNIT_SHEET_STACK_CLASS,
} from "../styles/CategoryUnitSheets.styles";

const CategoryUnitModifySheet = ({
  onClose,
  readings,
  unit,
}: CategoryUnitModifySheetProps): React.JSX.Element => {
  const modify = useCategoryUnitModify({
    onSaved: onClose,
    readings,
    unit,
  });

  return (
    <ActionSheet
      title={CATEGORY_UNITS_COPY.MODIFY_TITLE(unit.code)}
      onClose={onClose}
    >
      <div className={CATEGORY_UNIT_SHEET_STACK_CLASS}>
        {readings.hasFuelGauge && (
          <FuelGauge
            level={modify.fuelLevel}
            lowLines={readings.lowFuelLines}
            max={readings.fuelMax}
            onSelectLevel={modify.handleFuelLevelChange}
          />
        )}
        {readings.usageMetric !== null && (
          <FormField
            id={CATEGORY_UNIT_FIELD_ID.USAGE}
            name={CATEGORY_UNIT_FIELD_ID.USAGE}
            label={
              CATEGORY_UNIT_MODIFY_USAGE_LABEL[
                readings.usageMetric
              ]
            }
            labelSuffix={STRING.Empty}
            type={INPUT_TYPES.TEXT}
            inputMode={INPUT_MODE.DECIMAL}
            value={modify.usageText}
            error={modify.usageError ?? undefined}
            showErrorText
            onChange={modify.handleUsageChange}
          />
        )}
        <CountStepper
          label={CATEGORY_UNITS_COPY.IMPACT_COUNT_LABEL}
          lessLabel={CATEGORY_UNITS_COPY.IMPACT_COUNT_LESS}
          max={CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MAX}
          min={CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MIN}
          moreLabel={CATEGORY_UNITS_COPY.IMPACT_COUNT_MORE}
          onChange={modify.handleImpactCountChange}
          value={modify.impactCount}
        />
        {modify.errorMessage && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={CATEGORY_UNIT_SHEET_ALERT_CLASS}
          >
            {modify.errorMessage}
          </Text>
        )}
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.PRIMARY}
          isLoading={modify.isSaving}
          loadingText={CATEGORY_UNITS_COPY.MODIFY_SAVING}
          disabled={!modify.canSave}
          onClick={modify.handleSave}
        >
          {CATEGORY_UNITS_COPY.MODIFY_SAVE}
        </Button>
      </div>
    </ActionSheet>
  );
};

export default CategoryUnitModifySheet;
