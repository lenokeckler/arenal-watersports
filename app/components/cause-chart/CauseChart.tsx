import { DAMAGE_CAUSE_ORDER } from "@/app/constants";
import CauseChartRow from "./components/CauseChartRow";
import type { CauseChartProps } from "./models/CauseChartProps.interface";
import { CAUSE_CHART_CLASS } from "./styles/CauseChart.styles";
import type { JSX } from "react";

const CauseChart = ({
  counts,
  currentCause = null,
  label,
  resolveHref,
}: CauseChartProps): JSX.Element => {
  const highest = Math.max(
    ...DAMAGE_CAUSE_ORDER.map((cause) => counts[cause])
  );

  return (
    <nav
      aria-label={label}
      className={CAUSE_CHART_CLASS}
    >
      {DAMAGE_CAUSE_ORDER.map((cause) => (
        <CauseChartRow
          key={cause}
          cause={cause}
          count={counts[cause]}
          highest={highest}
          href={resolveHref(cause)}
          isCurrent={currentCause === cause}
        />
      ))}
    </nav>
  );
};

export default CauseChart;
