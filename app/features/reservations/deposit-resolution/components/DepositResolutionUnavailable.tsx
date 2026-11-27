import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_COPY as COPY } from "../constants/DepositResolutionUnavailableCopy.constants";
import type { DepositResolutionUnavailableProps } from "../models/DepositResolutionUnavailableProps.interface";
import {
  DEPOSIT_RESOLUTION_LOCKED_CLASS,
  DEPOSIT_RESOLUTION_LOCKED_TITLE_CLASS,
} from "../styles/DepositResolution.styles";
import DepositResolutionLayout from "./DepositResolutionLayout";

const DepositResolutionUnavailable = ({
  reason,
}: DepositResolutionUnavailableProps): React.JSX.Element => (
  <DepositResolutionLayout>
    <div
      role={ARIA_ROLE.STATUS}
      className={DEPOSIT_RESOLUTION_LOCKED_CLASS}
    >
      <Text
        className={DEPOSIT_RESOLUTION_LOCKED_TITLE_CLASS}
      >
        {COPY.TITLE[reason]}
      </Text>
      <Text>{COPY.BODY[reason]}</Text>
    </div>
  </DepositResolutionLayout>
);

export default DepositResolutionUnavailable;
