import Button from "@/app/components/button/Button";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  BUTTON,
  BUTTON_TYPES,
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
  hasUnsavedChanges,
  onRequestLeave,
}: CategoryConfigureHeaderProps): React.JSX.Element => {
  const backContent = (
    <>
      <MaterialIcon name={MATERIAL_ICON_NAME.ARROW_BACK} />
      {CATEGORY_CONFIGURE_COPY.BACK}
    </>
  );

  return (
    <div className={CATEGORY_CONFIGURE_HEADER_CLASS}>
      {hasUnsavedChanges ? (
        <Button
          variant={BUTTON.BASE}
          type={BUTTON_TYPES.BUTTON}
          onClick={onRequestLeave}
          className={
            CATEGORY_CONFIGURE_HEADER_BACK_LINK_CLASS
          }
        >
          {backContent}
        </Button>
      ) : (
        <Link
          href={PATHS.ADMINISTRATION.CATEGORIES}
          className={
            CATEGORY_CONFIGURE_HEADER_BACK_LINK_CLASS
          }
        >
          {backContent}
        </Link>
      )}
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={name}
        className={CATEGORY_CONFIGURE_HEADER_TITLE_CLASS}
      />
    </div>
  );
};

export default CategoryConfigureHeader;
