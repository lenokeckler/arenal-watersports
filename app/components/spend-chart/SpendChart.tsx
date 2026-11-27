import SpendChartColumn from "./components/SpendChartColumn";
import type { SpendChartProps } from "./models/SpendChartProps.interface";
import { SPEND_CHART_CLASS } from "./styles/SpendChart.styles";
import type { JSX } from "react";

const SpendChart = ({
  bars,
  label,
}: SpendChartProps): JSX.Element => {
  const highest = Math.max(
    ...bars.map((bar) => bar.amount)
  );

  return (
    <nav
      aria-label={label}
      className={SPEND_CHART_CLASS}
    >
      {bars.map((bar) => (
        <SpendChartColumn
          key={bar.key}
          bar={bar}
          highest={highest}
        />
      ))}
    </nav>
  );
};

export default SpendChart;
