import {
  EQUIPMENT_BOARD_SKELETON_CARD_CLASS,
  EQUIPMENT_BOARD_SKELETON_FIGURE_CLASS,
  EQUIPMENT_BOARD_SKELETON_LABEL_CLASS,
  EQUIPMENT_BOARD_SKELETON_TRACK_CLASS,
  EQUIPMENT_BOARD_SKELETON_USAGE_CLASS,
} from "../styles/EquipmentBoardState.styles";

const EquipmentBoardSkeletonCard =
  (): React.JSX.Element => (
    <div className={EQUIPMENT_BOARD_SKELETON_CARD_CLASS}>
      <div
        className={EQUIPMENT_BOARD_SKELETON_LABEL_CLASS}
      />
      <div
        className={EQUIPMENT_BOARD_SKELETON_FIGURE_CLASS}
      />
      <div
        className={EQUIPMENT_BOARD_SKELETON_USAGE_CLASS}
      />
      <div
        className={EQUIPMENT_BOARD_SKELETON_TRACK_CLASS}
      />
    </div>
  );

export default EquipmentBoardSkeletonCard;
