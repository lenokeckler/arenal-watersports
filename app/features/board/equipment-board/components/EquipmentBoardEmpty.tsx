import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  EQUIPMENT_BOARD_EMPTY_CLASS,
  EQUIPMENT_BOARD_EMPTY_ICON_CLASS,
  EQUIPMENT_BOARD_STATE_BODY_CLASS,
  EQUIPMENT_BOARD_STATE_TITLE_CLASS,
} from "../styles/EquipmentBoardState.styles";

const EquipmentBoardEmpty = (): React.JSX.Element => (
  <div className={EQUIPMENT_BOARD_EMPTY_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.SAILING}
      className={EQUIPMENT_BOARD_EMPTY_ICON_CLASS}
    />
    <Text className={EQUIPMENT_BOARD_STATE_TITLE_CLASS}>
      {EQUIPMENT_BOARD_COPY.EMPTY_TITLE}
    </Text>
    <Text className={EQUIPMENT_BOARD_STATE_BODY_CLASS}>
      {EQUIPMENT_BOARD_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default EquipmentBoardEmpty;
