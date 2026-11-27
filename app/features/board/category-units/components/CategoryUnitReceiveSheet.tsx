"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import CountStepper from "@/app/components/count-stepper/CountStepper";
import { formatCostaRicaTimeTwelveHour } from "@/app/components/dispatch-board/utils/formatCostaRicaTimeTwelveHour";
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
  CATEGORY_UNIT_RECEIVE_USAGE_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import { useCategoryUnitReceive } from "../hooks/useCategoryUnitReceive";
import type { CategoryUnitReceiveSheetProps } from "../models/CategoryUnitReceiveSheetProps.interface";
import {
  CATEGORY_UNIT_RECEIVE_HINT_CLASS,
  CATEGORY_UNIT_SHEET_ALERT_CLASS,
  CATEGORY_UNIT_SHEET_STACK_CLASS,
} from "../styles/CategoryUnitSheets.styles";
import { formatCategoryUnitUsage } from "../utils/formatCategoryUnitUsage";
import CategoryUnitReceiveLater from "./CategoryUnitReceiveLater";
import CategoryUnitReceiveOrder from "./CategoryUnitReceiveOrder";

const CategoryUnitReceiveSheet = ({
  occupancy,
  onClose,
  readings,
  unit,
}: CategoryUnitReceiveSheetProps): React.JSX.Element => {
  const receive = useCategoryUnitReceive({
    onReceived: onClose,
    readings,
    unitId: unit.id,
  });

  return (
    <ActionSheet
      title={CATEGORY_UNITS_COPY.RECEIVE_TITLE(unit.code)}
      onClose={onClose}
    >
      <div className={CATEGORY_UNIT_SHEET_STACK_CLASS}>
        <Text className={CATEGORY_UNIT_RECEIVE_HINT_CLASS}>
          {CATEGORY_UNITS_COPY.RECEIVE_DUE(
            occupancy.customerName,
            formatCostaRicaTimeTwelveHour(
              occupancy.returnsAt
            )
          )}
        </Text>
        {readings.hasFuelGauge && (
          <>
            <Text>{CATEGORY_UNITS_COPY.RECEIVE_FUEL}</Text>
            <FuelGauge
              level={receive.fuelLevel}
              lowLines={readings.lowFuelLines}
              max={readings.fuelMax}
              onSelectLevel={receive.handleFuelLevelChange}
            />
          </>
        )}
        {readings.usageMetric !== null && (
          <>
            <FormField
              id={CATEGORY_UNIT_FIELD_ID.USAGE}
              name={CATEGORY_UNIT_FIELD_ID.USAGE}
              label={
                CATEGORY_UNIT_RECEIVE_USAGE_LABEL[
                  readings.usageMetric
                ]
              }
              labelSuffix={STRING.Empty}
              type={INPUT_TYPES.TEXT}
              inputMode={INPUT_MODE.DECIMAL}
              value={receive.usageText}
              error={receive.usageError ?? undefined}
              showErrorText
              onChange={receive.handleUsageChange}
            />
            <Text
              className={CATEGORY_UNIT_RECEIVE_HINT_CLASS}
            >
              {CATEGORY_UNITS_COPY.RECEIVE_PREVIOUS(
                formatCategoryUnitUsage(
                  readings.usageTotal,
                  readings.usageMetric
                )
              )}
            </Text>
          </>
        )}
        <CountStepper
          label={CATEGORY_UNITS_COPY.IMPACT_COUNT_LABEL}
          lessLabel={CATEGORY_UNITS_COPY.IMPACT_COUNT_LESS}
          max={CATEGORY_UNIT_LIMITS.IMPACT_COUNT_MAX}
          min={readings.impactCount}
          moreLabel={CATEGORY_UNITS_COPY.IMPACT_COUNT_MORE}
          onChange={receive.handleImpactCountChange}
          value={receive.impactCount}
        />
        <CategoryUnitReceiveOrder
          damageCause={receive.damageCause}
          onDamageCauseChange={
            receive.handleDamageCauseChange
          }
          damageText={receive.damageText}
          hasDamage={receive.hasDamage}
          onDamageTextChange={
            receive.handleDamageTextChange
          }
          onHasDamageChange={receive.handleHasDamageChange}
        />
        {receive.errorMessage && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={CATEGORY_UNIT_SHEET_ALERT_CLASS}
          >
            {receive.errorMessage}
          </Text>
        )}
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.PRIMARY}
          isLoading={receive.isSaving}
          loadingText={CATEGORY_UNITS_COPY.RECEIVE_SAVING}
          disabled={!receive.canSave}
          onClick={receive.handleSave}
        >
          {CATEGORY_UNITS_COPY.RECEIVE}
        </Button>
        <CategoryUnitReceiveLater receive={receive} />
      </div>
    </ActionSheet>
  );
};

export default CategoryUnitReceiveSheet;
