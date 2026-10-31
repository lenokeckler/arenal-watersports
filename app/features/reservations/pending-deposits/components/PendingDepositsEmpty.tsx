import { DepositEmptyNotice } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";

const PendingDepositsEmpty = (): React.JSX.Element => (
  <DepositEmptyNotice
    icon={MATERIAL_ICON_NAME.LOCK_OPEN}
    title={PENDING_DEPOSITS_COPY.EMPTY_TITLE}
    body={PENDING_DEPOSITS_COPY.EMPTY_BODY}
  />
);

export default PendingDepositsEmpty;
