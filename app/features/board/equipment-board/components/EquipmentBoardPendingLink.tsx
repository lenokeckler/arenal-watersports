import { InlineText, Text } from "@/app/components";
import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardPendingLinkProps } from "../models/EquipmentBoardPendingLinkProps.interface";
import {
  EQUIPMENT_BOARD_PENDING_BADGE_CLASS,
  EQUIPMENT_BOARD_PENDING_HINT_CLASS,
  EQUIPMENT_BOARD_PENDING_LINK_CLASS,
  EQUIPMENT_BOARD_PENDING_TEXT_CLASS,
  EQUIPMENT_BOARD_PENDING_TITLE_CLASS,
} from "../styles/EquipmentBoard.styles";

const EquipmentBoardPendingLink = ({
  pendingDispatch,
}: EquipmentBoardPendingLinkProps): React.JSX.Element => (
  <Link
    href={PATHS.OPERATIONS.PENDING_DISPATCHES}
    className={EQUIPMENT_BOARD_PENDING_LINK_CLASS}
    ariaLabel={EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_LABEL(
      pendingDispatch.count
    )}
  >
    <span className={EQUIPMENT_BOARD_PENDING_TEXT_CLASS}>
      <InlineText
        className={EQUIPMENT_BOARD_PENDING_TITLE_CLASS}
      >
        {EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_TITLE}
      </InlineText>
      <Text className={EQUIPMENT_BOARD_PENDING_HINT_CLASS}>
        {EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_HINT}
      </Text>
    </span>
    {pendingDispatch.count !== null && (
      <InlineText
        className={EQUIPMENT_BOARD_PENDING_BADGE_CLASS}
      >
        {EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_COUNT(
          pendingDispatch.count
        )}
      </InlineText>
    )}
  </Link>
);

export default EquipmentBoardPendingLink;
