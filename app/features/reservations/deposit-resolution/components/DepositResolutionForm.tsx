import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  PATHS,
} from "@/app/constants";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import {
  DEPOSIT_RESOLUTION_FIELD_ID,
  DEPOSIT_RESOLUTION_FOCUS,
} from "../constants/DepositResolutionUi.constants";
import type { DepositResolutionFormProps } from "../models/DepositResolutionFormProps.interface";
import {
  DEPOSIT_RESOLUTION_ACTIONS_CLASS,
  DEPOSIT_RESOLUTION_ALERT_CLASS,
  DEPOSIT_RESOLUTION_SECONDARY_LINK_CLASS,
  DEPOSIT_RESOLUTION_SUBMIT_CLASS,
} from "../styles/DepositResolutionForm.styles";
import DepositResolutionChoiceField from "./DepositResolutionChoiceField";
import DepositResolutionReasonField from "./DepositResolutionReasonField";
import DepositResolutionReturnedField from "./DepositResolutionReturnedField";

const DepositResolutionForm = ({
  deposit,
  viewModel,
}: DepositResolutionFormProps): React.JSX.Element => (
  <>
    <DepositResolutionChoiceField
      deposit={deposit}
      isPending={viewModel.isPending}
      onSelect={viewModel.setReturnsAll}
      returnsAll={viewModel.returnsAll}
    />
    {viewModel.returnsAll ? null : (
      <>
        <DepositResolutionReturnedField
          deposit={deposit}
          error={viewModel.errors.returned}
          isPending={viewModel.isPending}
          keptAmount={viewModel.keptAmount}
          onChange={viewModel.setReturnedText}
          text={viewModel.returnedText}
        />
        <DepositResolutionReasonField
          error={viewModel.errors.reason}
          isPending={viewModel.isPending}
          onChange={viewModel.setReasonText}
          text={viewModel.reasonText}
        />
      </>
    )}
    {viewModel.formError && (
      <Text
        id={DEPOSIT_RESOLUTION_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={DEPOSIT_RESOLUTION_FOCUS.TAB_INDEX}
        className={DEPOSIT_RESOLUTION_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={DEPOSIT_RESOLUTION_ACTIONS_CLASS}
    >
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        className={DEPOSIT_RESOLUTION_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {viewModel.isPending
          ? COPY.SUBMITTING
          : COPY.SUBMIT}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.DEPOSITS}
        className={DEPOSIT_RESOLUTION_SECONDARY_LINK_CLASS}
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default DepositResolutionForm;
