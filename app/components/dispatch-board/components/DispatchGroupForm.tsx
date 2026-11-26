"use client";

import Text from "@/app/components/text/Text";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import { useDispatchGroupForm } from "../hooks/useDispatchGroupForm";
import type { DispatchGroupFormProps } from "../models/DispatchGroupFormProps.interface";
import {
  DISPATCH_SHEET_STACK_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";
import DispatchGroupHeader from "./DispatchGroupHeader";
import DispatchRadioField from "./DispatchRadioField";
import DispatchSelectedUnits from "./DispatchSelectedUnits";
import DispatchSubmitAction from "./DispatchSubmitAction";
import DispatchTakeCount from "./DispatchTakeCount";
import DispatchTimesStep from "./DispatchTimesStep";
import DispatchUnitGrid from "./DispatchUnitGrid";

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
  const { selection } = form;

  return (
    <form
      className={DISPATCH_SHEET_STACK_CLASS}
      onSubmit={form.handleSubmit}
    >
      <DispatchGroupHeader group={group} />
      <DispatchTakeCount
        requiredQuantity={group.requiredQuantity}
        take={selection.take}
      />
      {!group.isTrackedByUnit && (
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {DISPATCH_SHEET_COPY.QUANTITY_NOTE}
        </Text>
      )}
      {group.isTrackedByUnit &&
        !selection.isSelectionComplete && (
          <DispatchUnitGrid
            group={group}
            onToggle={selection.handleToggleUnit}
            selectedUnitIds={selection.selectedUnitIds}
            targetCount={selection.targetCount}
          />
        )}
      {group.isTrackedByUnit &&
        selection.isSelectionComplete && (
          <DispatchSelectedUnits
            fuel={form.fuel}
            group={group}
            onChangeUnits={selection.handleResetUnits}
            selectedUnitIds={selection.selectedUnitIds}
          />
        )}
      <DispatchRadioField radio={form.radio} />
      <DispatchTimesStep timeState={form.timeState} />
      <DispatchSubmitAction
        canSubmit={form.canSubmit}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default DispatchGroupForm;
