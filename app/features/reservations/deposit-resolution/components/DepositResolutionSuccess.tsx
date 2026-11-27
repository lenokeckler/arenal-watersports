import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DEPOSIT_RESOLUTION_FORM_COPY as COPY } from "../constants/DepositResolutionFormCopy.constants";
import {
  DEPOSIT_RESOLUTION_FIELD_ID,
  DEPOSIT_RESOLUTION_FOCUS,
} from "../constants/DepositResolutionUi.constants";
import { DEPOSIT_RESOLUTION_UI_COPY } from "../constants/DepositResolutionUiCopy.constants";
import { useDepositResolutionSuccessFocus } from "../hooks/useDepositResolutionFocus";
import type { DepositResolutionSuccessProps } from "../models/DepositResolutionSuccessProps.interface";
import {
  DEPOSIT_RESOLUTION_DETAILS_CLASS,
  DEPOSIT_RESOLUTION_PRIMARY_LINK_CLASS,
  DEPOSIT_RESOLUTION_STACK_CLASS,
} from "../styles/DepositResolution.styles";
import DepositResolutionSummaryRow from "./DepositResolutionSummaryRow";

const DepositResolutionSuccess = ({
  code,
  recorded,
}: DepositResolutionSuccessProps): React.JSX.Element => {
  useDepositResolutionSuccessFocus();
  const { currency } = recorded;

  return (
    <div className={DEPOSIT_RESOLUTION_STACK_CLASS}>
      <Text
        id={DEPOSIT_RESOLUTION_FIELD_ID.SUCCESS}
        role={ARIA_ROLE.STATUS}
        tabIndex={DEPOSIT_RESOLUTION_FOCUS.TAB_INDEX}
      >
        {COPY.SUCCESS(code)}
      </Text>
      <dl className={DEPOSIT_RESOLUTION_DETAILS_CLASS}>
        <DepositResolutionSummaryRow
          label={COPY.RETURNED_RECEIPT_LABEL}
          value={formatMoney({
            amount: recorded.returnedAmount,
            currency,
          })}
        />
        <DepositResolutionSummaryRow
          label={COPY.KEPT_LABEL}
          value={formatMoney({
            amount: recorded.keptAmount,
            currency,
          })}
        />
        {recorded.reason === null ? null : (
          <DepositResolutionSummaryRow
            label={COPY.REASON_LABEL}
            value={recorded.reason}
          />
        )}
      </dl>
      {recorded.resolvedByName === null ? null : (
        <Text>
          {COPY.RESOLVED_BY(recorded.resolvedByName)}
        </Text>
      )}
      <Link
        href={PATHS.RESERVATIONS.DEPOSITS}
        className={DEPOSIT_RESOLUTION_PRIMARY_LINK_CLASS}
      >
        {DEPOSIT_RESOLUTION_UI_COPY.BACK_TO_PENDING}
      </Link>
    </div>
  );
};

export default DepositResolutionSuccess;
