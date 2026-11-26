import { SVG_ICON } from "./constants/OilDropIcon.constants";
import type { OilDropIconProps } from "./models/OilDropIconProps.interface";

const OilDropIcon = ({
  className,
}: OilDropIconProps): React.JSX.Element => (
  <svg
    viewBox={SVG_ICON.VIEWBOX}
    className={className}
    fill="currentColor"
    aria-hidden
    focusable={false}
  >
    <path d={SVG_ICON.PATH} />
  </svg>
);

export default OilDropIcon;
