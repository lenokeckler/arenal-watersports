import { InlineText } from "@/app/components";
import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardPendingLinkProps } from "../models/EquipmentBoardPendingLinkProps.interface";
import {
  EQUIPMENT_BOARD_PENDING_BADGE_CLASS,
  EQUIPMENT_BOARD_PENDING_LINK_CLASS,
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
    <InlineText
      className={EQUIPMENT_BOARD_PENDING_TITLE_CLASS}
    >
      {EQUIPMENT_BOARD_COPY.PENDING_DISPATCH_TITLE}
    </InlineText>
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
