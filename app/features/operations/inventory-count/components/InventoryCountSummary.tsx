import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  INVENTORY_COUNT_FIELD_ID,
  INVENTORY_COUNT_RESULT,
} from "../constants/InventoryCount.constants";
import {
  INVENTORY_COUNT_COPY,
  INVENTORY_COUNT_MESSAGE,
} from "../constants/InventoryCountCopy.constants";
import type { InventoryCountPanelProps } from "../models/InventoryCountPanelProps.interface";
import {
  INVENTORY_COUNT_NOTE_CLASS,
  INVENTORY_COUNT_RESULT_CLASS,
  INVENTORY_COUNT_SUMMARY_CLASS,
} from "../styles/InventoryCount.styles";

const InventoryCountSummary = ({
  form,
}: InventoryCountPanelProps): React.JSX.Element => {
  const recorded =
    form.result === INVENTORY_COUNT_RESULT.RECORDED;

  return (
    <div className={INVENTORY_COUNT_SUMMARY_CLASS}>
      <Text className={INVENTORY_COUNT_NOTE_CLASS}>
        {form.canRegister
          ? INVENTORY_COUNT_COPY.READY_HINT
          : INVENTORY_COUNT_COPY.PENDING_HINT(
              form.pendingCount
            )}
      </Text>
      <FormField
        id={INVENTORY_COUNT_FIELD_ID.NOTES}
        name={INVENTORY_COUNT_FIELD_ID.NOTES}
        label={INVENTORY_COUNT_COPY.NOTES_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TEXTAREA}
        value={form.draft.notes}
        onChange={form.handleNotesChange}
      />
      {form.result && (
        <Text
          className={
            INVENTORY_COUNT_RESULT_CLASS[form.result]
          }
          role={
            recorded ? ARIA_ROLE.STATUS : ARIA_ROLE.ALERT
          }
        >
          {INVENTORY_COUNT_MESSAGE[form.result]}
        </Text>
      )}
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        disabled={!form.canRegister}
        isLoading={form.isSubmitting}
        loadingText={INVENTORY_COUNT_COPY.SUBMITTING}
      >
        {INVENTORY_COUNT_COPY.SUBMIT}
      </Button>
    </div>
  );
};

export default InventoryCountSummary;
