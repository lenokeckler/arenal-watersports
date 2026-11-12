import Link from "../link/Link";
import MaterialIcon from "../icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "../icons/material-icon/constants/MaterialIconName.constants";
import type { BackLinkProps } from "./models/BackLinkProps.interface";
import { BACK_LINK_CLASS } from "./styles/BackLink.styles";

const BackLink = ({
  href,
  label,
}: BackLinkProps): React.JSX.Element => (
  <Link
    href={href}
    className={BACK_LINK_CLASS}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
    {label}
  </Link>
);

export default BackLink;
