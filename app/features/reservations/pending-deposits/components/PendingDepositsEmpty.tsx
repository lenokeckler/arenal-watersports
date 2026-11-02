import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import {
  DEPOSIT_LIST_EMPTY_CLASS,
  DEPOSIT_LIST_EMPTY_ICON_CLASS,
  DEPOSIT_LIST_STATE_BODY_CLASS,
  DEPOSIT_LIST_STATE_TITLE_CLASS,
} from "../styles/PendingDepositsState.styles";

const PendingDepositsEmpty = (): React.JSX.Element => (
  <div className={DEPOSIT_LIST_EMPTY_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.LOCK_OPEN}
      className={DEPOSIT_LIST_EMPTY_ICON_CLASS}
    />
    <Text className={DEPOSIT_LIST_STATE_TITLE_CLASS}>
      {PENDING_DEPOSITS_COPY.EMPTY_TITLE}
    </Text>
    <Text className={DEPOSIT_LIST_STATE_BODY_CLASS}>
      {PENDING_DEPOSITS_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default PendingDepositsEmpty;
