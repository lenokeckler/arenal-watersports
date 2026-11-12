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
  CLOSE_GROUP_COPY,
  CLOSE_GROUP_FIELD_ID,
} from "../constants/CloseGroupCopy.constants";
import { useCloseGroupForm } from "../hooks/useCloseGroupForm";
import type { CloseGroupFormInput } from "../models/CloseGroupFormInput.interface";
import {
  CLOSE_GROUP_STACK_CLASS,
  DURATION_ADJUST_ERROR_CLASS,
  OUT_ON_WATER_EXTENDED_CLASS,
} from "../styles/OutOnWater.styles";
import CloseGroupUnitCard from "./CloseGroupUnitCard";

const CloseGroupFormView = (
  props: CloseGroupFormInput
): React.JSX.Element => {
  const form = useCloseGroupForm(props);

  return (
    <form
      className={CLOSE_GROUP_STACK_CLASS}
      onSubmit={form.handleSubmit}
    >
      <FormField
        id={CLOSE_GROUP_FIELD_ID.ARRIVAL}
        name={CLOSE_GROUP_FIELD_ID.ARRIVAL}
        label={CLOSE_GROUP_COPY.ARRIVAL_LABEL}
        labelSuffix={STRING.Empty}
        type={INPUT_TYPES.TIME}
        value={form.arrivalTime}
        error={form.arrivalError ?? undefined}
        showErrorText
        onChange={(event) =>
          form.handleArrivalChange(event.target.value)
        }
      />
      {form.rows.length === 0 ? (
        <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
          {CLOSE_GROUP_COPY.NO_UNITS_NOTE}
        </Text>
      ) : (
        <>
          <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
            {CLOSE_GROUP_COPY.READINGS_NOTE}
          </Text>
          {form.rows.map((row) => (
            <CloseGroupUnitCard
              key={row.unitId}
              onChange={form.handleDraftChange}
              row={row}
            />
          ))}
          <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
            {CLOSE_GROUP_COPY.OK_NOTE}
          </Text>
        </>
      )}
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
        loadingText={CLOSE_GROUP_COPY.SUBMITTING}
        disabled={!form.canSubmit}
      >
        {CLOSE_GROUP_COPY.SUBMIT}
      </Button>
    </form>
  );
};

export default CloseGroupFormView;
