"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_PHASE,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetViewModel } from "../models/DispatchSheetViewModel.interface";
import {
  DISPATCH_SHEET_ERROR_CLASS,
  DISPATCH_SHEET_MESSAGE_CLASS,
  DISPATCH_SHEET_STACK_CLASS,
} from "../styles/DispatchSheet.styles";
import DispatchGroupForm from "./DispatchGroupForm";
import DispatchSheetGroupChooser from "./DispatchSheetGroupChooser";

interface DispatchSheetBodyProps {
  preselectedUnitIds?: string[];
  viewModel: DispatchSheetViewModel;
}

const DispatchSheetBody = ({
  preselectedUnitIds,
  viewModel,
}: DispatchSheetBodyProps): React.JSX.Element => {
  const {
    errorMessage,
    groups,
    handleBack,
    handleSelectGroup,
    handleSubmitGroup,
    isSubmitting,
    phase,
    selectedGroup,
  } = viewModel;

  if (phase === DISPATCH_SHEET_PHASE.LOADING) {
    return (
      <Text className={DISPATCH_SHEET_MESSAGE_CLASS}>
        {DISPATCH_SHEET_COPY.LOADING}
      </Text>
    );
  }

  if (phase === DISPATCH_SHEET_PHASE.FAILED) {
    return (
      <Text
        role={ARIA_ROLE.ALERT}
        className={DISPATCH_SHEET_ERROR_CLASS}
      >
        {DISPATCH_SHEET_COPY.LOAD_ERROR}
      </Text>
    );
  }

  return (
    <div className={DISPATCH_SHEET_STACK_CLASS}>
      {errorMessage && (
        <Text
          role={ARIA_ROLE.ALERT}
          className={DISPATCH_SHEET_ERROR_CLASS}
        >
          {errorMessage}
        </Text>
      )}
      {groups.length === 0 && (
        <Text className={DISPATCH_SHEET_MESSAGE_CLASS}>
          {DISPATCH_SHEET_COPY.NOTHING_LEFT}
        </Text>
      )}
      {groups.length > 0 && !selectedGroup && (
        <DispatchSheetGroupChooser
          groups={groups}
          onSelect={handleSelectGroup}
        />
      )}
      {selectedGroup && (
        <DispatchGroupForm
          key={selectedGroup.categoryId}
          group={selectedGroup}
          preselectedUnitIds={preselectedUnitIds}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitGroup}
        />
      )}
      {selectedGroup && groups.length > 1 && (
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          onClick={handleBack}
        >
          {DISPATCH_SHEET_COPY.BACK}
        </Button>
      )}
    </div>
  );
};

export default DispatchSheetBody;
