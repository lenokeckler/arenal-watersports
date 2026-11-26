import { OIL_REMAINING_COPY } from "@/app/constants";
import { formatOilRemaining } from "@/app/utils/oil-remaining/formatOilRemaining";
import OilDropIcon from "../icons/oil-drop/OilDropIcon";
import InlineText from "../text/InlineText";
import type { OilRemainingProps } from "./models/OilRemainingProps.interface";
import {
  OIL_REMAINING_CLASS,
  resolveOilRemainingIconClass,
} from "./styles/OilRemaining.styles";

const OilRemaining = ({
  metric,
  remaining,
}: OilRemainingProps): React.JSX.Element => (
  <InlineText
    aria-label={OIL_REMAINING_COPY.LABEL}
    title={OIL_REMAINING_COPY.LABEL}
    className={OIL_REMAINING_CLASS}
  >
    {formatOilRemaining(remaining, metric)}
    <OilDropIcon
      className={resolveOilRemainingIconClass(
        remaining <= 0
      )}
    />
  </InlineText>
);

export default OilRemaining;
