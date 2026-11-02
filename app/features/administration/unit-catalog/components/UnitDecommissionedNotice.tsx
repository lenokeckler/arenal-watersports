import Text from "@/app/components/text/Text";
import type { UnitDecommissionedNoticeProps } from "../models/UnitDecommissionedNoticeProps.interface";
import { UNIT_DECOMMISSION_NOTICE_CLASS } from "../styles/UnitDecommission.styles";

const UnitDecommissionedNotice = ({
  notice,
}: UnitDecommissionedNoticeProps): React.JSX.Element => (
  <Text className={UNIT_DECOMMISSION_NOTICE_CLASS}>
    {notice}
  </Text>
);

export default UnitDecommissionedNotice;
