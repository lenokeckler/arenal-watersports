import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DEPOSIT_RESOLUTION_FIELD_ID } from "../constants/DepositResolutionUi.constants";
import { DEPOSIT_RESOLUTION_UI_COPY as COPY } from "../constants/DepositResolutionUiCopy.constants";
import type { DepositResolutionViewProps } from "../models/DepositResolutionViewProps.interface";
import {
  DEPOSIT_RESOLUTION_CODE_CLASS,
  DEPOSIT_RESOLUTION_DETAILS_CLASS,
  DEPOSIT_RESOLUTION_SUMMARY_CLASS,
  DEPOSIT_RESOLUTION_SUMMARY_HEADING_CLASS,
} from "../styles/DepositResolution.styles";
import DepositResolutionSummaryRow from "./DepositResolutionSummaryRow";

const DepositResolutionSummary = ({
  deposit,
}: DepositResolutionViewProps): React.JSX.Element => (
  <Section
    ariaLabel={DEPOSIT_RESOLUTION_FIELD_ID.SUMMARY_HEADING}
    className={DEPOSIT_RESOLUTION_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={DEPOSIT_RESOLUTION_FIELD_ID.SUMMARY_HEADING}
        variant={TitleVariant.SECONDARY}
        text={COPY.SUMMARY_HEADING}
        className={DEPOSIT_RESOLUTION_SUMMARY_HEADING_CLASS}
      />
      <Text className={DEPOSIT_RESOLUTION_CODE_CLASS}>
        {deposit.code}
      </Text>
    </div>
    <dl className={DEPOSIT_RESOLUTION_DETAILS_CLASS}>
      <DepositResolutionSummaryRow
        label={COPY.LABEL_CUSTOMER}
        value={deposit.customerName}
      />
      <DepositResolutionSummaryRow
        label={COPY.LABEL_DEPOSIT}
        value={formatMoney(deposit)}
      />
    </dl>
  </Section>
);

export default DepositResolutionSummary;
