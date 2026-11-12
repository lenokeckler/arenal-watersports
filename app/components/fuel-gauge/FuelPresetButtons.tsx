import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE } from "@/app/constants";
import { FUEL_GAUGE_COPY } from "./constants/FuelGaugeCopy.constants";
import type { FuelPresetButtonsProps } from "./models/FuelPresetButtonsProps.interface";
import {
  FUEL_PRESET_BUTTON_CLASS,
  FUEL_PRESETS_CLASS,
} from "./styles/FuelGauge.styles";
import { getFuelPresets } from "./utils/getFuelPresets";

const FuelPresetButtons = ({
  isDisabled = false,
  level,
  max,
  onSelect,
}: FuelPresetButtonsProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={FUEL_GAUGE_COPY.PRESET_GROUP_LABEL}
    className={FUEL_PRESETS_CLASS}
  >
    {getFuelPresets(max).map((preset) => (
      <Button
        key={preset.id}
        type="button"
        variant={
          level === preset.level
            ? BUTTON.PRIMARY
            : BUTTON.SECONDARY
        }
        className={FUEL_PRESET_BUTTON_CLASS}
        disabled={isDisabled}
        aria-label={`${FUEL_GAUGE_COPY.PRESET_NAME[preset.id]}${FUEL_GAUGE_COPY.NAME_SEPARATOR}${preset.level}${FUEL_GAUGE_COPY.LEVEL_OF}${max}`}
        aria-pressed={level === preset.level}
        onClick={() => onSelect(preset.level)}
      >
        {FUEL_GAUGE_COPY.PRESET_TEXT[preset.id]}
      </Button>
    ))}
  </div>
);

export default FuelPresetButtons;
