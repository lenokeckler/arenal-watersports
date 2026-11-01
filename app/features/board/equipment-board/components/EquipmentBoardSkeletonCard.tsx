import {
  EQUIPMENT_BOARD_SKELETON_CARD_CLASS,
  EQUIPMENT_BOARD_SKELETON_MEDIA_CLASS,
} from "../styles/EquipmentBoardState.styles";

const EquipmentBoardSkeletonCard =
  (): React.JSX.Element => (
    <div className={EQUIPMENT_BOARD_SKELETON_CARD_CLASS}>
      <div
        className={EQUIPMENT_BOARD_SKELETON_MEDIA_CLASS}
      />
    </div>
  );

export default EquipmentBoardSkeletonCard;
