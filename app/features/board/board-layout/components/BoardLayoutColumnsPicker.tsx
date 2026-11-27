import { Button, Text } from "@/app/components";
import {
  ARIA_ROLE,
  BOARD_LAYOUT_COLUMN_OPTIONS,
  BUTTON,
  BUTTON_TYPES,
} from "@/app/constants";
import { BOARD_LAYOUT_COPY } from "../constants/BoardLayoutCopy.constants";
import type { BoardLayoutColumnsPickerProps } from "../models/BoardLayoutColumnsPickerProps.interface";
import {
  BOARD_LAYOUT_COLUMNS_GROUP_CLASS,
  BOARD_LAYOUT_LABEL_CLASS,
  resolveBoardLayoutColumnsOptionClassName,
} from "../styles/BoardLayoutControls.styles";

const BoardLayoutColumnsPicker = ({
  columns,
  onChange,
}: BoardLayoutColumnsPickerProps): React.JSX.Element => (
  <>
    <Text className={BOARD_LAYOUT_LABEL_CLASS}>
      {BOARD_LAYOUT_COPY.COLUMNS_LABEL}
    </Text>
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={BOARD_LAYOUT_COPY.COLUMNS_LABEL}
      className={BOARD_LAYOUT_COLUMNS_GROUP_CLASS}
    >
      {BOARD_LAYOUT_COLUMN_OPTIONS.map((option) => (
        <Button
          key={option}
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          aria-pressed={columns === option}
          aria-label={BOARD_LAYOUT_COPY.COLUMNS_OPTION_ARIA(
            option
          )}
          className={resolveBoardLayoutColumnsOptionClassName(
            columns === option
          )}
          onClick={() => onChange(option)}
        >
          {BOARD_LAYOUT_COPY.COLUMNS_OPTION(option)}
        </Button>
      ))}
    </div>
  </>
);

export default BoardLayoutColumnsPicker;
