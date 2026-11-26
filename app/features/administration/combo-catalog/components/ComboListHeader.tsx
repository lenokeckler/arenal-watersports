import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import {
  COMBO_LIST_CREATE_LINK_CLASS,
  COMBO_LIST_HEADER_CLASS,
  COMBO_LIST_TITLE_CLASS,
} from "../styles/ComboList.styles";

const ComboListHeader = (): React.JSX.Element => (
  <div className={COMBO_LIST_HEADER_CLASS}>
    <Title
      id={ADMINISTRATION_SCREEN_TITLE_ID}
      variant={TitleVariant.PRIMARY}
      text={COMBO_CATALOG_COPY.LIST_TITLE}
      className={COMBO_LIST_TITLE_CLASS}
    />
    <Link
      href={PATHS.ADMINISTRATION.COMBOS_NEW}
      className={COMBO_LIST_CREATE_LINK_CLASS}
    >
      {COMBO_CATALOG_COPY.CREATE_CTA}
    </Link>
  </div>
);

export default ComboListHeader;
