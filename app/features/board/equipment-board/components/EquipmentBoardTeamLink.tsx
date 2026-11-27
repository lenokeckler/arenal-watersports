import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import { PATHS } from "@/app/constants";
import { safeNumber } from "@/app/utils/safe-value/SafeValue";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardTeamLinkProps } from "../models/EquipmentBoardTeamLinkProps.interface";
import {
  EQUIPMENT_BOARD_TEAM_BADGE_CLASS,
  EQUIPMENT_BOARD_TEAM_LINK_CLASS,
} from "../styles/EquipmentBoard.styles";

const EquipmentBoardTeamLink = ({
  pending,
}: EquipmentBoardTeamLinkProps): React.JSX.Element => (
  <Link
    href={PATHS.OPERATIONS.EQUIPMENT}
    className={EQUIPMENT_BOARD_TEAM_LINK_CLASS}
    ariaLabel={EQUIPMENT_BOARD_COPY.TEAM_LABEL(
      safeNumber(pending)
    )}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.BUILD} />
    {EQUIPMENT_BOARD_COPY.TEAM_TITLE}
    {Boolean(pending) && (
      <InlineText
        className={EQUIPMENT_BOARD_TEAM_BADGE_CLASS}
      >
        {pending}
      </InlineText>
    )}
  </Link>
);

export default EquipmentBoardTeamLink;
