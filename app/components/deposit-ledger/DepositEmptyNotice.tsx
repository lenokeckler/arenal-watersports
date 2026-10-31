import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import Text from "@/app/components/text/Text";
import type { DepositEmptyNoticeProps } from "./models/DepositEmptyNoticeProps.interface";
import {
  DEPOSIT_NOTICE_BODY_CLASS,
  DEPOSIT_NOTICE_EMPTY_CLASS,
  DEPOSIT_NOTICE_EMPTY_ICON_CLASS,
  DEPOSIT_NOTICE_TITLE_CLASS,
} from "./styles/DepositNotice.styles";

const DepositEmptyNotice = ({
  icon,
  title,
  body,
}: DepositEmptyNoticeProps): React.JSX.Element => (
  <div className={DEPOSIT_NOTICE_EMPTY_CLASS}>
    <MaterialIcon
      name={icon}
      className={DEPOSIT_NOTICE_EMPTY_ICON_CLASS}
    />
    <Text className={DEPOSIT_NOTICE_TITLE_CLASS}>
      {title}
    </Text>
    <Text className={DEPOSIT_NOTICE_BODY_CLASS}>
      {body}
    </Text>
  </div>
);

export default DepositEmptyNotice;
