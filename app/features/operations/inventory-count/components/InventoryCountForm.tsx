"use client";

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
import { useInventoryCountForm } from "../hooks/useInventoryCountForm";
import type { InventoryCountFormProps } from "../models/InventoryCountFormProps.interface";
import {
  INVENTORY_COUNT_FORM_CLASS,
  INVENTORY_COUNT_RESULT_CLASS,
  INVENTORY_COUNT_STEP_BUTTON_CLASS,
  INVENTORY_COUNT_STEP_NAV_CLASS,
  INVENTORY_COUNT_STEP_PROGRESS_CLASS,
} from "../styles/InventoryCount.styles";
import InventoryCountCategorySection from "./InventoryCountCategorySection";

const InventoryCountForm = (
  props: InventoryCountFormProps
): React.JSX.Element => {
  const form = useInventoryCountForm(props);
  const recorded =
    form.result === INVENTORY_COUNT_RESULT.RECORDED;

  return (
    <form
      className={INVENTORY_COUNT_FORM_CLASS}
      onSubmit={form.handleSubmit}
    >
      <Text className={INVENTORY_COUNT_STEP_PROGRESS_CLASS}>
        {INVENTORY_COUNT_COPY.STEP_PROGRESS(
          Math.min(
            form.stepIndex + 1,
            props.categories.length
          ),
          props.categories.length
        )}
      </Text>
      {form.currentCategory ? (
        <InventoryCountCategorySection
          key={form.currentCategory.id}
          category={form.currentCategory}
          form={form}
        />
      ) : (
        <>
          <Text
            className={INVENTORY_COUNT_STEP_PROGRESS_CLASS}
          >
            {INVENTORY_COUNT_COPY.SUMMARY_TEXT(
              props.categories.length
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
        </>
      )}
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
      <div className={INVENTORY_COUNT_STEP_NAV_CLASS}>
        {form.stepIndex > 0 && (
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.BASE}
            className={INVENTORY_COUNT_STEP_BUTTON_CLASS}
            onClick={form.goToPreviousStep}
          >
            {INVENTORY_COUNT_COPY.PREVIOUS}
          </Button>
        )}
        {form.isSummaryStep ? (
          <Button
            type={BUTTON_TYPES.SUBMIT}
            variant={BUTTON.PRIMARY}
            isLoading={form.isSubmitting}
            loadingText={INVENTORY_COUNT_COPY.SUBMITTING}
          >
            {INVENTORY_COUNT_COPY.SUBMIT}
          </Button>
        ) : (
          <Button
            type={BUTTON_TYPES.BUTTON}
            variant={BUTTON.PRIMARY}
            onClick={form.goToNextStep}
          >
            {INVENTORY_COUNT_COPY.NEXT}
          </Button>
        )}
      </div>
    </form>
  );
};

export default InventoryCountForm;
