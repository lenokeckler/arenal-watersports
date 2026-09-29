import { MaterialIconProps } from "./models/MaterialIconProps.interface";
import { resolveMaterialIconClassName } from "./styles/MaterialIcon.styles";

const MaterialIcon = ({
  name,
  className = "",
}: MaterialIconProps): React.JSX.Element => (
  <span
    className={resolveMaterialIconClassName(className)}
    aria-hidden
  >
    {name}
  </span>
);

export default MaterialIcon;
