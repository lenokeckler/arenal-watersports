import {
  MaterialIcon,
  Text,
  Title,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { TitleVariant } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  EQUIPMENT_BOARD_DESCRIPTION_CLASS,
  EQUIPMENT_BOARD_HEADER_CLASS,
  EQUIPMENT_BOARD_HEADING_GROUP_CLASS,
  EQUIPMENT_BOARD_ICON_CLASS,
  EQUIPMENT_BOARD_ICON_TILE_CLASS,
  EQUIPMENT_BOARD_TITLE_CLASS,
} from "../styles/EquipmentBoard.styles";

const EquipmentBoardHeader = (): React.JSX.Element => (
  <header className={EQUIPMENT_BOARD_HEADER_CLASS}>
    <div className={EQUIPMENT_BOARD_ICON_TILE_CLASS}>
      <MaterialIcon
        name={MATERIAL_ICON_NAME.DASHBOARD}
        className={EQUIPMENT_BOARD_ICON_CLASS}
      />
    </div>
    <div className={EQUIPMENT_BOARD_HEADING_GROUP_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={EQUIPMENT_BOARD_COPY.PAGE_TITLE}
        className={EQUIPMENT_BOARD_TITLE_CLASS}
      />
      <Text className={EQUIPMENT_BOARD_DESCRIPTION_CLASS}>
        {EQUIPMENT_BOARD_COPY.PAGE_DESCRIPTION}
      </Text>
    </div>
  </header>
);

export default EquipmentBoardHeader;
