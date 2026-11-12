import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import { EQUIPMENT_BOARD_SKELETON_INDEXES } from "../constants/EquipmentBoard.constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  EQUIPMENT_BOARD_GRID_CLASS,
  EQUIPMENT_BOARD_GRID_ITEM_CLASS,
  EQUIPMENT_BOARD_PAGE_CLASS,
} from "../styles/EquipmentBoard.styles";
import EquipmentBoardHeader from "./EquipmentBoardHeader";
import EquipmentBoardSkeletonCard from "./EquipmentBoardSkeletonCard";

const EquipmentBoardLoading = (): React.JSX.Element => (
  <main
    className={EQUIPMENT_BOARD_PAGE_CLASS}
    aria-busy
  >
    <EquipmentBoardHeader />
    <Text
      role={ARIA_ROLE.STATUS}
      className={SCREEN_READER_ONLY_CLASS}
    >
      {EQUIPMENT_BOARD_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <div className={EQUIPMENT_BOARD_GRID_CLASS}>
      {EQUIPMENT_BOARD_SKELETON_INDEXES.map(
        (skeletonIndex) => (
          <div
            key={skeletonIndex}
            className={EQUIPMENT_BOARD_GRID_ITEM_CLASS}
          >
            <EquipmentBoardSkeletonCard />
          </div>
        )
      )}
    </div>
  </main>
);

export default EquipmentBoardLoading;
