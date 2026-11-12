"use client";

import FormField from "@/app/components/form-field/FormField";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import FuelPresetButtons from "@/app/components/fuel-gauge/FuelPresetButtons";
import Text from "@/app/components/text/Text";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  CLOSE_GROUP_COPY,
  CLOSE_GROUP_FIELD_ID,
  CLOSE_GROUP_USAGE_COPY,
} from "../constants/CloseGroupCopy.constants";
import { CLOSE_GROUP_DAMAGE_CAUSE } from "../constants/CloseGroup.constants";
import type { CloseGroupUnitCardProps } from "../models/CloseGroupUnitCardProps.interface";
import {
  CLOSE_GROUP_BLOCK_CLASS,
  CLOSE_GROUP_CARD_CLASS,
  CLOSE_GROUP_DAMAGE_CLASS,
  CLOSE_GROUP_LABEL_CLASS,
  CLOSE_GROUP_LEGEND_CLASS,
  OUT_ON_WATER_EXTENDED_CLASS,
} from "../styles/OutOnWater.styles";

const CAUSE_OPTIONS = Object.values(
  CLOSE_GROUP_DAMAGE_CAUSE
).map((cause) => ({
  key: cause,
  label: CLOSE_GROUP_COPY.CAUSES[cause],
  value: cause,
}));

const CloseGroupUnitCard = ({
  onChange,
  row,
}: CloseGroupUnitCardProps): React.JSX.Element => (
  <fieldset className={CLOSE_GROUP_CARD_CLASS}>
    <legend className={CLOSE_GROUP_LEGEND_CLASS}>
      {row.code}
    </legend>
    {row.consumesFuel && (
      <div className={CLOSE_GROUP_BLOCK_CLASS}>
        <Text className={CLOSE_GROUP_LABEL_CLASS}>
          {CLOSE_GROUP_COPY.FUEL_LABEL}
        </Text>
        <FuelGauge
          level={row.fuelLevel}
          max={row.fuelMax}
          onSelectLevel={(level) =>
            onChange(row.unitId, { fuel: String(level) })
          }
        />
        <FuelPresetButtons
          level={row.fuelLevel}
          max={row.fuelMax}
          onSelect={(level) =>
            onChange(row.unitId, { fuel: String(level) })
          }
        />
        <FormField
          id={`${CLOSE_GROUP_FIELD_ID.FUEL_PREFIX}${row.unitId}`}
          name={`${CLOSE_GROUP_FIELD_ID.FUEL_PREFIX}${row.unitId}`}
          label={CLOSE_GROUP_COPY.FUEL_FIELD_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.NUMERIC}
          value={row.draft.fuel}
          error={row.fuelError ?? undefined}
          showErrorText
          onChange={(event) =>
            onChange(row.unitId, {
              fuel: event.target.value,
            })
          }
        />
        <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
          {row.fuelOut === null
            ? CLOSE_GROUP_COPY.FUEL_OUT_NONE
            : `${CLOSE_GROUP_COPY.FUEL_OUT_PREFIX}${row.fuelOut} de ${row.fuelMax}.`}
        </Text>
      </div>
    )}
    {row.usageMetric !== null && (
      <div className={CLOSE_GROUP_BLOCK_CLASS}>
        <FormField
          id={`${CLOSE_GROUP_FIELD_ID.USAGE_PREFIX}${row.unitId}`}
          name={`${CLOSE_GROUP_FIELD_ID.USAGE_PREFIX}${row.unitId}`}
          label={
            CLOSE_GROUP_USAGE_COPY[row.usageMetric].LABEL
          }
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.DECIMAL}
          value={row.draft.usage}
          error={row.usageError ?? undefined}
          showErrorText
          onChange={(event) =>
            onChange(row.unitId, {
              usage: event.target.value,
            })
          }
        />
        <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
          {row.usageOut === null
            ? CLOSE_GROUP_COPY.USAGE_OUT_NONE
            : `${CLOSE_GROUP_COPY.USAGE_OUT_PREFIX}${row.usageOut}${CLOSE_GROUP_USAGE_COPY[row.usageMetric].UNIT}.`}
        </Text>
      </div>
    )}
    <FormField
      id={`${CLOSE_GROUP_FIELD_ID.DAMAGE_PREFIX}${row.unitId}`}
      name={`${CLOSE_GROUP_FIELD_ID.DAMAGE_PREFIX}${row.unitId}`}
      label={CLOSE_GROUP_COPY.DAMAGE_LABEL}
      value={CLOSE_GROUP_COPY.DAMAGE_LABEL}
      labelSuffix={STRING.Empty}
      type={INPUT_TYPES.CHECKBOX}
      checked={row.draft.hasDamage}
      onChange={() =>
        onChange(row.unitId, {
          hasDamage: !row.draft.hasDamage,
        })
      }
    />
    <FormField
      id={`${CLOSE_GROUP_FIELD_ID.MAINTENANCE_PREFIX}${row.unitId}`}
      name={`${CLOSE_GROUP_FIELD_ID.MAINTENANCE_PREFIX}${row.unitId}`}
      label={CLOSE_GROUP_COPY.MAINTENANCE_LABEL}
      value={CLOSE_GROUP_COPY.MAINTENANCE_LABEL}
      labelSuffix={STRING.Empty}
      type={INPUT_TYPES.CHECKBOX}
      checked={row.draft.maintenance}
      onChange={() =>
        onChange(row.unitId, {
          maintenance: !row.draft.maintenance,
        })
      }
    />
    {row.draft.hasDamage && (
      <div className={CLOSE_GROUP_DAMAGE_CLASS}>
        <FormField
          id={`${CLOSE_GROUP_FIELD_ID.CAUSE_PREFIX}${row.unitId}`}
          name={`${CLOSE_GROUP_FIELD_ID.CAUSE_PREFIX}${row.unitId}`}
          label={CLOSE_GROUP_COPY.CAUSE_LABEL}
          labelSuffix={STRING.Empty}
          placeholder={CLOSE_GROUP_COPY.CAUSE_PLACEHOLDER}
          type={INPUT_TYPES.SELECT}
          options={CAUSE_OPTIONS}
          value={row.draft.cause}
          error={row.causeError ?? undefined}
          showErrorText
          onChange={(event) =>
            onChange(row.unitId, {
              cause: event.target.value,
            })
          }
        />
        <FormField
          id={`${CLOSE_GROUP_FIELD_ID.DESCRIPTION_PREFIX}${row.unitId}`}
          name={`${CLOSE_GROUP_FIELD_ID.DESCRIPTION_PREFIX}${row.unitId}`}
          label={CLOSE_GROUP_COPY.DESCRIPTION_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXTAREA}
          value={row.draft.description}
          error={row.descriptionError ?? undefined}
          showErrorText
          onChange={(event) =>
            onChange(row.unitId, {
              description: event.target.value,
            })
          }
        />
        <FormField
          id={`${CLOSE_GROUP_FIELD_ID.IMPACT_PREFIX}${row.unitId}`}
          name={`${CLOSE_GROUP_FIELD_ID.IMPACT_PREFIX}${row.unitId}`}
          label={CLOSE_GROUP_COPY.IMPACT_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.NUMERIC}
          value={row.draft.impact}
          error={row.impactError ?? undefined}
          showErrorText
          onChange={(event) =>
            onChange(row.unitId, {
              impact: event.target.value,
            })
          }
        />
      </div>
    )}
  </fieldset>
);

export default CloseGroupUnitCard;
