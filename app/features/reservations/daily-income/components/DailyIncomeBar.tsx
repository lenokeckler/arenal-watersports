import {
  DAILY_INCOME_BAR,
  SVG_PRESERVE_ASPECT_RATIO_NONE,
} from "../constants/DailyIncome.constants";
import type { DailyIncomeBarProps } from "../models/DailyIncomeBarProps.interface";
import {
  METHOD_BAR_FILL_CLASS,
  METHOD_BAR_TRACK_CLASS,
} from "../styles/DailyIncomeBar.styles";

const DailyIncomeBar = ({
  percent,
}: DailyIncomeBarProps): React.JSX.Element => (
  <svg
    viewBox={DAILY_INCOME_BAR.VIEWBOX}
    preserveAspectRatio={SVG_PRESERVE_ASPECT_RATIO_NONE}
    className={METHOD_BAR_TRACK_CLASS}
    aria-hidden
    focusable={false}
  >
    <rect
      width={percent}
      height={DAILY_INCOME_BAR.VIEWBOX_HEIGHT}
      className={METHOD_BAR_FILL_CLASS}
    />
  </svg>
);

export default DailyIncomeBar;
