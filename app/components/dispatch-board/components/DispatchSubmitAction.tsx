"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { BUTTON_TYPES } from "@/app/constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchSubmitActionProps } from "../models/DispatchSubmitActionProps.interface";
import {
  DISPATCH_SUBMIT_BAR_CLASS,
  DISPATCH_SUBMIT_BUTTON_CLASS,
} from "../styles/DispatchSheet.styles";

const DispatchSubmitAction = ({
  canSubmit,
  isSubmitting,
}: DispatchSubmitActionProps): React.JSX.Element => (
  <div className={DISPATCH_SUBMIT_BAR_CLASS}>
    <Button
      type={BUTTON_TYPES.SUBMIT}
      variant={BUTTON.PRIMARY}
      className={DISPATCH_SUBMIT_BUTTON_CLASS}
      isLoading={isSubmitting}
      loadingText={DISPATCH_SHEET_COPY.SUBMITTING}
      disabled={!canSubmit}
    >
      {DISPATCH_SHEET_COPY.SUBMIT}
    </Button>
  </div>
);

export default DispatchSubmitAction;
