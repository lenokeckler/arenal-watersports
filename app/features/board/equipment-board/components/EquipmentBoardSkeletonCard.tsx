import { BOARD_CARD_BODY_CLASS } from "../styles/BoardCard.styles";
import {
  EQUIPMENT_BOARD_SKELETON_CARD_CLASS,
  EQUIPMENT_BOARD_SKELETON_MEDIA_CLASS,
  EQUIPMENT_BOARD_SKELETON_TRACK_CLASS,
  EQUIPMENT_BOARD_SKELETON_USAGE_CLASS,
} from "../styles/EquipmentBoardState.styles";

const EquipmentBoardSkeletonCard =
  (): React.JSX.Element => (
    <div className={EQUIPMENT_BOARD_SKELETON_CARD_CLASS}>
      <div
        className={EQUIPMENT_BOARD_SKELETON_MEDIA_CLASS}
      />
      <div className={BOARD_CARD_BODY_CLASS}>
        <div
          className={EQUIPMENT_BOARD_SKELETON_TRACK_CLASS}
        />
        <div
          className={EQUIPMENT_BOARD_SKELETON_USAGE_CLASS}
        />
      </div>
    </div>
  );

export default EquipmentBoardSkeletonCard;
