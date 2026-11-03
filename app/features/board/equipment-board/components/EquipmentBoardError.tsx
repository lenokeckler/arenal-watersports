"use client";

import {
  Button,
  MaterialIcon,
  Text,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import type { EquipmentBoardErrorProps } from "../models/EquipmentBoardErrorProps.interface";
import { EQUIPMENT_BOARD_PAGE_CLASS } from "../styles/EquipmentBoard.styles";
import {
  EQUIPMENT_BOARD_ERROR_BODY_CLASS,
  EQUIPMENT_BOARD_ERROR_BUTTON_CLASS,
  EQUIPMENT_BOARD_ERROR_CLASS,
  EQUIPMENT_BOARD_ERROR_ICON_CLASS,
  EQUIPMENT_BOARD_ERROR_TEXT_CLASS,
  EQUIPMENT_BOARD_ERROR_TITLE_CLASS,
} from "../styles/EquipmentBoardState.styles";
import EquipmentBoardHeader from "./EquipmentBoardHeader";

const EquipmentBoardError = ({
  reset,
}: EquipmentBoardErrorProps): React.JSX.Element => (
  <main className={EQUIPMENT_BOARD_PAGE_CLASS}>
    <EquipmentBoardHeader />
    <div
      role={ARIA_ROLE.ALERT}
      className={EQUIPMENT_BOARD_ERROR_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={EQUIPMENT_BOARD_ERROR_ICON_CLASS}
      />
      <div className={EQUIPMENT_BOARD_ERROR_TEXT_CLASS}>
        <Text className={EQUIPMENT_BOARD_ERROR_TITLE_CLASS}>
          {EQUIPMENT_BOARD_COPY.ERROR_TITLE}
        </Text>
        <Text className={EQUIPMENT_BOARD_ERROR_BODY_CLASS}>
          {EQUIPMENT_BOARD_COPY.ERROR_BODY}
        </Text>
      </div>
    </div>
    <Button
      variant={BUTTON.PRIMARY}
      className={EQUIPMENT_BOARD_ERROR_BUTTON_CLASS}
      onClick={reset}
    >
      {EQUIPMENT_BOARD_COPY.RETRY}
    </Button>
  </main>
);

export default EquipmentBoardError;
