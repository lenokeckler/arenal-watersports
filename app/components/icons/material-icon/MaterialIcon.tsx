import { STRING } from "@/app/constants";
import { MaterialIconProps } from "./models/MaterialIconProps.interface";
import { resolveMaterialIconClassName } from "./styles/MaterialIcon.styles";

const MaterialIcon = ({
  name,
  className = STRING.Empty,
}: MaterialIconProps): React.JSX.Element => (
  <span
    className={resolveMaterialIconClassName(className)}
    aria-hidden
  >
    {name}
  </span>
);

export default MaterialIcon;
