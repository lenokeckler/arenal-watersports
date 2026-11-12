import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  EQUIPMENT_BOARD_CONNECTION_NOTICE_CLASS,
  EQUIPMENT_BOARD_ERROR_BODY_CLASS,
  EQUIPMENT_BOARD_ERROR_TITLE_CLASS,
} from "../styles/EquipmentBoardState.styles";

const EquipmentBoardConnectionNotice =
  (): React.JSX.Element => (
    <div
      role={ARIA_ROLE.ALERT}
      className={EQUIPMENT_BOARD_CONNECTION_NOTICE_CLASS}
    >
      <Text className={EQUIPMENT_BOARD_ERROR_TITLE_CLASS}>
        {EQUIPMENT_BOARD_COPY.LIVE_UPDATES_LOST_TITLE}
      </Text>
      <Text className={EQUIPMENT_BOARD_ERROR_BODY_CLASS}>
        {EQUIPMENT_BOARD_COPY.LIVE_UPDATES_LOST_BODY}
      </Text>
    </div>
  );

export default EquipmentBoardConnectionNotice;
