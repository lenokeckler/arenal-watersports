import Text from "@/app/components/text/Text";
import { FUEL_GAUGE_COPY } from "./constants/FuelGaugeCopy.constants";
import type { FuelGaugeProps } from "./models/FuelGaugeProps.interface";
import {
  FUEL_GAUGE_LINES_CLASS,
  FUEL_GAUGE_READOUT_CLASS,
  FUEL_GAUGE_WRAPPER_CLASS,
  resolveFuelLineClassName,
} from "./styles/FuelGauge.styles";
import { buildFuelLines } from "./utils/buildFuelLines";
import { getFuelGaugeTier } from "./utils/getFuelGaugeTier";

const FuelGauge = ({
  level,
  max,
  onSelectLevel,
}: FuelGaugeProps): React.JSX.Element => {
  const tier =
    level === null ? null : getFuelGaugeTier(level, max);

  return (
    <div className={FUEL_GAUGE_WRAPPER_CLASS}>
      <div className={FUEL_GAUGE_LINES_CLASS}>
        {buildFuelLines(max).map((line) => {
          const className = resolveFuelLineClassName({
            isFilled: level !== null && line <= level,
            isInteractive: Boolean(onSelectLevel),
            tier,
          });

          return onSelectLevel ? (
            <button
              key={line}
              type="button"
              aria-label={`${FUEL_GAUGE_COPY.LINE_LABEL}${line}${FUEL_GAUGE_COPY.LEVEL_OF}${max}`}
              aria-pressed={level !== null && line <= level}
              className={className}
              onClick={() => onSelectLevel(line)}
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
      <Text className={FUEL_GAUGE_READOUT_CLASS}>
        {level === null
          ? FUEL_GAUGE_COPY.NO_READING
          : `${level}${FUEL_GAUGE_COPY.LEVEL_OF}${max}`}
      </Text>
    </div>
  );
};

export default FuelGauge;
