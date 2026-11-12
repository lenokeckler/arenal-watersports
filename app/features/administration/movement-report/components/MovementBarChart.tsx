import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { MovementBarChartProps } from "../models/MovementBarChart.interface";
import {
  MOVEMENT_REPORT_BAR_FILL_CLASS,
  MOVEMENT_REPORT_BAR_LABEL_CLASS,
  MOVEMENT_REPORT_BAR_ROW_CLASS,
  MOVEMENT_REPORT_BAR_SVG_CLASS,
  MOVEMENT_REPORT_BAR_VALUE_CLASS,
  MOVEMENT_REPORT_CHART_CLASS,
  MOVEMENT_REPORT_CHART_LIST_CLASS,
  MOVEMENT_REPORT_CHART_TITLE_CLASS,
} from "../styles/MovementReport.styles";

const FULL_WIDTH = 100;
const BAR_HEIGHT = 10;

const MovementBarChart = ({
  rows,
  title,
}: MovementBarChartProps): React.JSX.Element => {
  const largest = Math.max(
    ...rows.map((row) => row.value),
    0
  );

  return (
    <section className={MOVEMENT_REPORT_CHART_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={title}
        className={MOVEMENT_REPORT_CHART_TITLE_CLASS}
      />
      <ul className={MOVEMENT_REPORT_CHART_LIST_CLASS}>
        {rows.map((row) => (
          <li
            key={row.key}
            className={MOVEMENT_REPORT_BAR_ROW_CLASS}
          >
            <Text
              className={MOVEMENT_REPORT_BAR_LABEL_CLASS}
            >
              {row.label}
            </Text>
            <svg
              aria-hidden="true"
              className={MOVEMENT_REPORT_BAR_SVG_CLASS}
              preserveAspectRatio="none"
              viewBox={`0 0 ${FULL_WIDTH} ${BAR_HEIGHT}`}
            >
              <rect
                className={MOVEMENT_REPORT_BAR_FILL_CLASS}
                height={BAR_HEIGHT}
                width={
                  largest === 0
                    ? 0
                    : (row.value / largest) * FULL_WIDTH
                }
              />
            </svg>
            <Text
              className={MOVEMENT_REPORT_BAR_VALUE_CLASS}
            >
              {row.valueLabel}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovementBarChart;
