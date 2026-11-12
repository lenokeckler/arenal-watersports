"use client";

import ActionSheet from "@/app/components/action-sheet/ActionSheet";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import { DURATION_ADJUST_DELTAS } from "../constants/OutOnWater.constants";
import {
  DURATION_ADJUST_COPY,
  DURATION_ADJUST_FIELD_ID,
  OUT_ON_WATER_COPY,
} from "../constants/OutOnWaterCopy.constants";
import { useDurationAdjustForm } from "../hooks/useDurationAdjustForm";
import type { DurationAdjustSheetProps } from "../models/DurationAdjustSheetProps.interface";
import {
  DURATION_ADJUST_ERROR_CLASS,
  DURATION_ADJUST_PRESETS_CLASS,
  DURATION_ADJUST_STACK_CLASS,
  OUT_ON_WATER_CARD_DETAIL_CLASS,
} from "../styles/OutOnWater.styles";
import { formatDelta } from "../utils/formatDelta";
import { formatDuration } from "../utils/formatDuration";

const DurationAdjustSheet = (
  props: DurationAdjustSheetProps
): React.JSX.Element => {
  const { group, onClose } = props;
  const form = useDurationAdjustForm(props);

  return (
    <ActionSheet
      title={`${DURATION_ADJUST_COPY.TITLE_PREFIX}${group.customerName}`}
      onClose={onClose}
    >
      <form
        className={DURATION_ADJUST_STACK_CLASS}
        onSubmit={form.handleSubmit}
      >
        <Text className={OUT_ON_WATER_CARD_DETAIL_CLASS}>
          {`${group.categoryName}${OUT_ON_WATER_COPY.RESERVATION_SEPARATOR}${DURATION_ADJUST_COPY.CURRENT_LABEL}${formatDuration(group.durationMinutes)}`}
        </Text>
        <div
          role={ARIA_ROLE.GROUP}
          aria-label={
            DURATION_ADJUST_COPY.PRESET_GROUP_LABEL
          }
          className={DURATION_ADJUST_PRESETS_CLASS}
        >
          {DURATION_ADJUST_DELTAS.map((delta) => (
            <Button
              key={delta}
              type={BUTTON_TYPES.BUTTON}
              variant={BUTTON.SECONDARY}
              onClick={() => form.handleDelta(delta)}
            >
              {formatDelta(delta)}
            </Button>
          ))}
        </div>
        <FormField
          id={DURATION_ADJUST_FIELD_ID}
          name={DURATION_ADJUST_FIELD_ID}
          label={DURATION_ADJUST_COPY.FIELD_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.NUMERIC}
          value={form.minutesText}
          error={form.fieldError ?? undefined}
          showErrorText
          onChange={form.handleChange}
        />
        {form.errorMessage && (
          <Text
            className={DURATION_ADJUST_ERROR_CLASS}
            role={ARIA_ROLE.ALERT}
          >
            {form.errorMessage}
          </Text>
        )}
        <Button
          type={BUTTON_TYPES.SUBMIT}
          variant={BUTTON.PRIMARY}
          isLoading={form.isSubmitting}
          loadingText={DURATION_ADJUST_COPY.SAVING}
          disabled={!form.canSubmit}
        >
          {DURATION_ADJUST_COPY.SAVE}
        </Button>
      </form>
    </ActionSheet>
  );
};

export default DurationAdjustSheet;
