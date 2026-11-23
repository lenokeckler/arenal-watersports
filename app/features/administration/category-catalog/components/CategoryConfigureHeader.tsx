import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureHeaderProps } from "../models/CategoryConfigureHeaderProps.interface";
import {
  CATEGORY_CONFIGURE_HEADER_BACK_LINK_CLASS,
  CATEGORY_CONFIGURE_HEADER_CLASS,
  CATEGORY_CONFIGURE_HEADER_TITLE_CLASS,
} from "../styles/CategoryConfigureHeader.styles";

const CategoryConfigureHeader = ({
  name,
}: CategoryConfigureHeaderProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_HEADER_CLASS}>
    <Link
      href={PATHS.ADMINISTRATION.CATEGORIES}
      className={CATEGORY_CONFIGURE_HEADER_BACK_LINK_CLASS}
    >
      <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
      {CATEGORY_CONFIGURE_COPY.BACK}
    </Link>
    <Title
      id={ADMINISTRATION_SCREEN_TITLE_ID}
      variant={TitleVariant.PRIMARY}
      text={name}
      className={CATEGORY_CONFIGURE_HEADER_TITLE_CLASS}
    />
  </div>
);

export default CategoryConfigureHeader;
