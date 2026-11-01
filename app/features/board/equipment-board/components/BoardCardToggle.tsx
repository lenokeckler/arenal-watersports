"use client";

import { Button, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { BUTTON } from "@/app/constants";
import { useBoardCardToggleViewModel } from "../hooks/useBoardCardToggleViewModel";
import type { BoardCardToggleProps } from "../models/BoardCardToggleProps.interface";
import {
  BOARD_CARD_SLOT_CLASS,
  BOARD_CARD_TOGGLE_CLASS,
  resolveBoardCardChevronClassName,
} from "../styles/BoardCard.styles";

const BoardCardToggle = ({
  children,
  label,
  panel,
}: BoardCardToggleProps): React.JSX.Element => {
  const { isOpen, panelId, toggle } =
    useBoardCardToggleViewModel();

  return (
    <>
      <div className={BOARD_CARD_SLOT_CLASS}>
        {children}
        <Button
          type="button"
          variant={BUTTON.BASE}
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={BOARD_CARD_TOGGLE_CLASS}
          onClick={toggle}
        >
          <MaterialIcon
            name={MATERIAL_ICON_NAME.EXPAND_MORE}
            className={resolveBoardCardChevronClassName(
              isOpen
            )}
          />
        </Button>
      </div>
      <div
        id={panelId}
        hidden={!isOpen}
      >
        {panel}
      </div>
    </>
  );
};

export default BoardCardToggle;
