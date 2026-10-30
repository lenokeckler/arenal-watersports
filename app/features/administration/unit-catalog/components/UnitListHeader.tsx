import Link from "@/app/components/link/Link";
import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  PATHS,
  STRING,
} from "@/app/constants";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import type { UnitListHeaderProps } from "../models/UnitListHeaderProps.interface";
import { UNIT_LIST_HEADER_CLASS } from "../styles/UnitList.styles";
import { UNIT_LIST_LINK_CLASS } from "../styles/UnitListLink.styles";

const UnitListHeader = ({
  categoryName,
}: UnitListHeaderProps): React.JSX.Element => (
  <div className={UNIT_LIST_HEADER_CLASS}>
    <ScreenHeading
      title={[
        UNIT_LIST_COPY.LIST_TITLE_PREFIX,
        categoryName,
      ].join(STRING.SPACE)}
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      instruction={UNIT_LIST_COPY.LIST_PURPOSE}
    />
    <Link
      href={PATHS.ADMINISTRATION.CATEGORIES}
      className={UNIT_LIST_LINK_CLASS}
    >
      {UNIT_LIST_COPY.BACK_TO_CATEGORIES_LINK}
    </Link>
  </div>
);

export default UnitListHeader;
