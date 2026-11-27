import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitAccessRowProps } from "../models/CategoryUnitAccessRowProps.interface";
import {
  CATEGORY_UNIT_ACCESS_CLASS,
  CATEGORY_UNIT_ACCESS_LINK_CLASS,
} from "../styles/CategoryUnitStatusSheet.styles";

const CategoryUnitAccessRow = ({
  hasPhotos,
  unitId,
}: CategoryUnitAccessRowProps): React.JSX.Element => (
  <nav
    aria-label={CATEGORY_UNITS_COPY.ACCESS_LABEL}
    className={CATEGORY_UNIT_ACCESS_CLASS}
  >
    <Link
      href={PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(unitId)}
      className={CATEGORY_UNIT_ACCESS_LINK_CLASS}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.WARNING} />
      {CATEGORY_UNITS_COPY.ACCESS_DAMAGE}
    </Link>
    {hasPhotos && (
      <Link
        href={PATHS.OPERATIONS.UNIT_PHOTOS(unitId)}
        className={CATEGORY_UNIT_ACCESS_LINK_CLASS}
      >
        <MaterialIcon
          name={MATERIAL_ICON_NAME.PHOTO_CAMERA}
        />
        {CATEGORY_UNITS_COPY.ACCESS_PHOTOS}
      </Link>
    )}
    <Link
      href={PATHS.OPERATIONS.UNIT_HISTORY(unitId)}
      className={CATEGORY_UNIT_ACCESS_LINK_CLASS}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.HISTORY} />
      {CATEGORY_UNITS_COPY.ACCESS_HISTORY}
    </Link>
  </nav>
);

export default CategoryUnitAccessRow;
