import RankChartItem from "./components/RankChartItem";
import type { RankChartProps } from "./models/RankChartProps.interface";
import { RANK_CHART_CLASS } from "./styles/RankChart.styles";
import type { JSX } from "react";

const RankChart = ({
  label,
  rows,
}: RankChartProps): JSX.Element => {
  const highest = Math.max(
    0,
    ...rows.map((row) => row.amount)
  );

  return (
    <nav
      aria-label={label}
      className={RANK_CHART_CLASS}
    >
      {rows.map((row) => (
        <RankChartItem
          key={row.key}
          highest={highest}
          row={row}
        />
      ))}
    </nav>
  );
};

export default RankChart;
