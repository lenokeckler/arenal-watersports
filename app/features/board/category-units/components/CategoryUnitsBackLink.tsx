import { Link, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { CATEGORY_UNITS_BACK_LINK_CLASS } from "../styles/CategoryUnits.styles";

const CategoryUnitsBackLink = (): React.JSX.Element => (
  <Link
    href={PATHS.BOARD}
    className={CATEGORY_UNITS_BACK_LINK_CLASS}
  >
    <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
    {CATEGORY_UNITS_COPY.BACK_TO_BOARD}
  </Link>
);

export default CategoryUnitsBackLink;
