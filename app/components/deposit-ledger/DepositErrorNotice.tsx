import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import type { DepositErrorNoticeProps } from "./models/DepositErrorNoticeProps.interface";
import {
  DEPOSIT_NOTICE_ERROR_BODY_CLASS,
  DEPOSIT_NOTICE_ERROR_CLASS,
  DEPOSIT_NOTICE_ERROR_ICON_CLASS,
  DEPOSIT_NOTICE_ERROR_TEXT_CLASS,
  DEPOSIT_NOTICE_ERROR_TITLE_CLASS,
} from "./styles/DepositNotice.styles";

const DepositErrorNotice = ({
  title,
  body,
}: DepositErrorNoticeProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.ALERT}
    className={DEPOSIT_NOTICE_ERROR_CLASS}
  >
    <MaterialIcon
      name={MATERIAL_ICON_NAME.ERROR}
      className={DEPOSIT_NOTICE_ERROR_ICON_CLASS}
    />
    <div className={DEPOSIT_NOTICE_ERROR_TEXT_CLASS}>
      <Text className={DEPOSIT_NOTICE_ERROR_TITLE_CLASS}>
        {title}
      </Text>
      <Text className={DEPOSIT_NOTICE_ERROR_BODY_CLASS}>
        {body}
      </Text>
    </div>
  </div>
);

export default DepositErrorNotice;
