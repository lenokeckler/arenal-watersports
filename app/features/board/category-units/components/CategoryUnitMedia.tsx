import { Image, MaterialIcon } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { CATEGORY_UNIT_IMAGE } from "../constants/CategoryUnits.constants";
import type { CategoryUnitMediaProps } from "../models/CategoryUnitMediaProps.interface";
import {
  CATEGORY_UNIT_ROW_IMAGE_CLASS,
  CATEGORY_UNIT_ROW_MEDIA_CLASS,
  CATEGORY_UNIT_ROW_PLACEHOLDER_CLASS,
  CATEGORY_UNIT_ROW_PLACEHOLDER_ICON_CLASS,
} from "../styles/CategoryUnitRow.styles";

const CategoryUnitMedia = ({
  image,
}: CategoryUnitMediaProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_ROW_MEDIA_CLASS}>
    {image ? (
      <Image
        alt={image.alt}
        className={CATEGORY_UNIT_ROW_IMAGE_CLASS}
        height={CATEGORY_UNIT_IMAGE.HEIGHT}
        priority={false}
        sizes={CATEGORY_UNIT_IMAGE.SIZES}
        src={image.source}
        width={CATEGORY_UNIT_IMAGE.WIDTH}
      />
    ) : (
      <div className={CATEGORY_UNIT_ROW_PLACEHOLDER_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.SAILING}
          className={
            CATEGORY_UNIT_ROW_PLACEHOLDER_ICON_CLASS
          }
        />
      </div>
    )}
  </div>
);

export default CategoryUnitMedia;
