"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  BUTTON_TYPES,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
} from "../constants/DispatchSheetCopy.constants";
import { useDispatchGroupForm } from "../hooks/useDispatchGroupForm";
import type { DispatchGroupFormProps } from "../models/DispatchGroupFormProps.interface";
import {
  DISPATCH_SHEET_ACTIONS_CLASS,
  DISPATCH_SHEET_MESSAGE_CLASS,
  DISPATCH_SHEET_STACK_CLASS,
  DISPATCH_SHEET_SUMMARY_CLASS,
  DISPATCH_SHEET_SUMMARY_TITLE_CLASS,
  DISPATCH_SHEET_TIMES_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";
import DispatchUnitOptions from "./DispatchUnitOptions";
import DispatchUnitReadings from "./DispatchUnitReadings";

const DispatchGroupForm = ({
  group,
  isSubmitting,
  onSubmit,
  preselectedUnitIds,
}: DispatchGroupFormProps): React.JSX.Element => {
  const form = useDispatchGroupForm({
    group,
    onSubmit,
    preselectedUnitIds,
  });
  const committedCount = group.isTrackedByUnit
    ? group.fixedUnitIds.length + group.requiredQuantity
    : group.requiredQuantity;

  return (
    <form
      className={DISPATCH_SHEET_STACK_CLASS}
      onSubmit={form.handleSubmit}
    >
      <div className={DISPATCH_SHEET_SUMMARY_CLASS}>
        <Text
          className={DISPATCH_SHEET_SUMMARY_TITLE_CLASS}
        >
          {group.categoryName}
        </Text>
        <Text className={DISPATCH_SHEET_MESSAGE_CLASS}>
          {`${DISPATCH_SHEET_COPY.COMMITTED_LABEL} ${committedCount}${DISPATCH_SHEET_COPY.GROUP_SEPARATOR}${
            group.hasMotor
              ? DISPATCH_SHEET_COPY.WITH_MOTOR
              : DISPATCH_SHEET_COPY.WITHOUT_MOTOR
          }`}
        </Text>
      </div>
      {group.isTrackedByUnit ? (
        <DispatchUnitOptions
          group={group}
          onToggle={form.handleToggleUnit}
          selectedUnitIds={form.selectedUnitIds}
          targetCount={form.targetCount}
        />
      ) : (
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {DISPATCH_SHEET_COPY.QUANTITY_NOTE}
        </Text>
      )}
      <DispatchUnitReadings
        group={group}
        readings={form.readings}
      />
      <div className={DISPATCH_SHEET_TIMES_CLASS}>
        <FormField
          id={DISPATCH_SHEET_FIELD_ID.DEPARTURE}
          name={DISPATCH_SHEET_FIELD_ID.DEPARTURE}
          label={DISPATCH_SHEET_COPY.DEPARTURE_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TIME}
          value={form.departureTime}
          onChange={form.handleDepartureChange}
        />
        <FormField
          id={DISPATCH_SHEET_FIELD_ID.RETURN}
          name={DISPATCH_SHEET_FIELD_ID.RETURN}
          label={DISPATCH_SHEET_COPY.RETURN_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TIME}
          value={form.returnTime}
          onChange={form.handleReturnChange}
        />
      </div>
      {form.isNextDay && (
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {DISPATCH_SHEET_COPY.NEXT_DAY_NOTE}
        </Text>
      )}
      <div className={DISPATCH_SHEET_ACTIONS_CLASS}>
        <Button
          type={BUTTON_TYPES.SUBMIT}
          variant={BUTTON.PRIMARY}
          isLoading={isSubmitting}
          loadingText={DISPATCH_SHEET_COPY.SUBMITTING}
          disabled={!form.canSubmit}
        >
          {DISPATCH_SHEET_COPY.SUBMIT}
        </Button>
      </div>
    </form>
  );
};

export default DispatchGroupForm;
