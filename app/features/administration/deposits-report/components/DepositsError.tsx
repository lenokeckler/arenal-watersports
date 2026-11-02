"use client";

import BackLink from "@/app/components/back-link/BackLink";
import Button from "@/app/components/button/Button";
import DepositErrorNotice from "@/app/components/deposit-ledger/DepositErrorNotice";
import { BUTTON, PATHS } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import type { DepositsErrorProps } from "../models/DepositsErrorProps.interface";
import {
  DEPOSITS_REPORT_RETRY_CLASS,
  DEPOSITS_REPORT_STACK_CLASS,
} from "../styles/DepositsReport.styles";
import DepositsHeading from "./DepositsHeading";

const DepositsError = ({
  reset,
}: DepositsErrorProps): React.JSX.Element => (
  <div className={DEPOSITS_REPORT_STACK_CLASS}>
    <DepositsHeading />
    <DepositErrorNotice
      title={DEPOSITS_REPORT_COPY.ERROR_TITLE}
      body={DEPOSITS_REPORT_COPY.ERROR_BODY}
    />
    <Button
      variant={BUTTON.PRIMARY}
      className={DEPOSITS_REPORT_RETRY_CLASS}
      onClick={reset}
    >
      {DEPOSITS_REPORT_COPY.RETRY}
    </Button>
    <BackLink
      href={PATHS.HOME}
      label={DEPOSITS_REPORT_COPY.BACK}
    />
  </div>
);

export default DepositsError;
