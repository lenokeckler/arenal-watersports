import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  EQUIPMENT_BOARD_DESCRIPTION_CLASS,
  EQUIPMENT_BOARD_HEADER_CLASS,
  EQUIPMENT_BOARD_TITLE_CLASS,
} from "../styles/EquipmentBoard.styles";

const EquipmentBoardHeader = (): React.JSX.Element => (
  <header className={EQUIPMENT_BOARD_HEADER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      text={EQUIPMENT_BOARD_COPY.PAGE_TITLE}
      className={EQUIPMENT_BOARD_TITLE_CLASS}
    />
    <Text className={EQUIPMENT_BOARD_DESCRIPTION_CLASS}>
      {EQUIPMENT_BOARD_COPY.PAGE_DESCRIPTION}
    </Text>
  </header>
);

export default EquipmentBoardHeader;
