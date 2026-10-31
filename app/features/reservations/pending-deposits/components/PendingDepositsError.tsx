import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import { PENDING_DEPOSITS_PAGE_CLASS } from "../styles/PendingDeposits.styles";
import {
  DEPOSIT_LIST_ERROR_BODY_CLASS,
  DEPOSIT_LIST_ERROR_CLASS,
  DEPOSIT_LIST_ERROR_ICON_CLASS,
  DEPOSIT_LIST_ERROR_TEXT_CLASS,
  DEPOSIT_LIST_ERROR_TITLE_CLASS,
} from "../styles/PendingDepositsState.styles";
import PendingDepositsHeader from "./PendingDepositsHeader";

const PendingDepositsError = (): React.JSX.Element => (
  <main className={PENDING_DEPOSITS_PAGE_CLASS}>
    <PendingDepositsHeader />
    <div
      role={ARIA_ROLE.ALERT}
      className={DEPOSIT_LIST_ERROR_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={DEPOSIT_LIST_ERROR_ICON_CLASS}
      />
      <div className={DEPOSIT_LIST_ERROR_TEXT_CLASS}>
        <Text className={DEPOSIT_LIST_ERROR_TITLE_CLASS}>
          {PENDING_DEPOSITS_COPY.ERROR_TITLE}
        </Text>
        <Text className={DEPOSIT_LIST_ERROR_BODY_CLASS}>
          {PENDING_DEPOSITS_COPY.ERROR_BODY}
        </Text>
      </div>
    </div>
  </main>
);

export default PendingDepositsError;
