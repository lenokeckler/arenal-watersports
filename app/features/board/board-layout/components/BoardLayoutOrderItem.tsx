import {
  Button,
  InlineText,
  MaterialIcon,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import {
  ARIA_ROLE,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { BOARD_LAYOUT_COPY } from "../constants/BoardLayoutCopy.constants";
import type { BoardLayoutOrderItemProps } from "../models/BoardLayoutOrderItemProps.interface";
import {
  BOARD_LAYOUT_HANDLE_CLASS,
  BOARD_LAYOUT_ORDER_ITEM_LABEL_CLASS,
  resolveBoardLayoutOrderItemClassName,
} from "../styles/BoardLayoutControls.styles";

const BoardLayoutOrderItem = ({
  card,
  handleProps,
  isDragged,
}: BoardLayoutOrderItemProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LISTITEM}
    className={resolveBoardLayoutOrderItemClassName(
      isDragged
    )}
  >
    <InlineText
      className={BOARD_LAYOUT_ORDER_ITEM_LABEL_CLASS}
    >
      {card.label}
    </InlineText>
    <Button
      type={BUTTON_TYPES.BUTTON}
      variant={BUTTON.BASE}
      aria-label={BOARD_LAYOUT_COPY.MOVE_HANDLE(card.label)}
      className={BOARD_LAYOUT_HANDLE_CLASS}
      {...handleProps}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.DRAG_INDICATOR}
      />
    </Button>
  </div>
);

export default BoardLayoutOrderItem;
