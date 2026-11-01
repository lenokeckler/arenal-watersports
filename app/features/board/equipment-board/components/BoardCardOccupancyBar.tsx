import { EQUIPMENT_BOARD_BAR } from "../constants/EquipmentBoard.constants";
import type { BoardCardOccupancyBarProps } from "../models/BoardCardOccupancyBarProps.interface";
import {
  BOARD_CARD_BAR_FILL_CLASS,
  BOARD_CARD_BAR_TRACK_CLASS,
} from "../styles/BoardCard.styles";

const BoardCardOccupancyBar = ({
  percent,
}: BoardCardOccupancyBarProps): React.JSX.Element => (
  <svg
    viewBox={EQUIPMENT_BOARD_BAR.VIEWBOX}
    preserveAspectRatio={
      EQUIPMENT_BOARD_BAR.PRESERVE_ASPECT_RATIO
    }
    className={BOARD_CARD_BAR_TRACK_CLASS}
    aria-hidden
    focusable={false}
  >
    <rect
      width={percent}
      height={EQUIPMENT_BOARD_BAR.VIEWBOX_HEIGHT}
      className={BOARD_CARD_BAR_FILL_CLASS}
    />
  </svg>
);

export default BoardCardOccupancyBar;
