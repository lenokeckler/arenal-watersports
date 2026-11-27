import { ARIA_ROLE } from "@/app/constants";
import { FUEL_GAUGE_LINE } from "./constants/FuelGauge.constants";
import { FUEL_GAUGE_COPY } from "./constants/FuelGaugeCopy.constants";
import type { FuelGaugeProps } from "./models/FuelGaugeProps.interface";
import {
  FUEL_GAUGE_LINES_CLASS,
  FUEL_GAUGE_WRAPPER_CLASS,
  resolveFuelLineClassName,
} from "./styles/FuelGauge.styles";
import { buildFuelLines } from "./utils/buildFuelLines";
import { getFuelGaugeTone } from "./utils/getFuelGaugeTone";
import { getNextFuelLevel } from "./utils/getNextFuelLevel";

const FuelGauge = ({
  level,
  lowLines = FUEL_GAUGE_LINE.FIRST,
  max,
  onSelectLevel,
}: FuelGaugeProps): React.JSX.Element => {
  const tone = getFuelGaugeTone(level, lowLines);
  const readableLevel =
    level === null
      ? FUEL_GAUGE_COPY.NO_READING
      : `${level}${FUEL_GAUGE_COPY.LEVEL_OF}${max}`;

  return (
    <div
      className={FUEL_GAUGE_WRAPPER_CLASS}
      role={onSelectLevel ? ARIA_ROLE.GROUP : ARIA_ROLE.IMG}
      aria-label={`${FUEL_GAUGE_COPY.GAUGE_LABEL}${FUEL_GAUGE_COPY.NAME_SEPARATOR}${readableLevel}`}
    >
      <div className={FUEL_GAUGE_LINES_CLASS}>
        {buildFuelLines(max).map((line) => {
          const isFilled = level !== null && line <= level;
          const className = resolveFuelLineClassName({
            isFilled,
            isInteractive: Boolean(onSelectLevel),
            tone,
          });

          return onSelectLevel ? (
            <button
              key={line}
              type="button"
              aria-label={`${FUEL_GAUGE_COPY.LINE_LABEL}${line}${FUEL_GAUGE_COPY.LEVEL_OF}${max}`}
              aria-pressed={isFilled}
              className={className}
              onClick={() =>
                onSelectLevel(getNextFuelLevel(level, line))
              }
            />
          ) : (
            <span
              key={line}
              aria-hidden
              className={className}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FuelGauge;
