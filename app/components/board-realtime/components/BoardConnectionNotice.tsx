import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { BOARD_REALTIME_COPY } from "../constants/BoardRealtimeCopy.constants";
import {
  BOARD_REALTIME_NOTICE_BODY_CLASS,
  BOARD_REALTIME_NOTICE_CLASS,
  BOARD_REALTIME_NOTICE_TITLE_CLASS,
} from "../styles/BoardRealtime.styles";

const BoardConnectionNotice = (): React.JSX.Element => (
  <div
    role={ARIA_ROLE.ALERT}
    className={BOARD_REALTIME_NOTICE_CLASS}
  >
    <Text className={BOARD_REALTIME_NOTICE_TITLE_CLASS}>
      {BOARD_REALTIME_COPY.LIVE_UPDATES_LOST_TITLE}
    </Text>
    <Text className={BOARD_REALTIME_NOTICE_BODY_CLASS}>
      {BOARD_REALTIME_COPY.LIVE_UPDATES_LOST_BODY}
    </Text>
  </div>
);

export default BoardConnectionNotice;
