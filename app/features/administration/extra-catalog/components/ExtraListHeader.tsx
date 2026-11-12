import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import {
  EXTRA_LIST_CREATE_LINK_CLASS,
  EXTRA_LIST_HEADER_CLASS,
  EXTRA_LIST_HEADER_TITLE_CLASS,
} from "../styles/ExtraList.styles";

const ExtraListHeader = (): React.JSX.Element => (
  <div className={EXTRA_LIST_HEADER_CLASS}>
    <Title
      id={ADMINISTRATION_SCREEN_TITLE_ID}
      variant={TitleVariant.PRIMARY}
      text={EXTRA_CATALOG_COPY.LIST_TITLE}
      className={EXTRA_LIST_HEADER_TITLE_CLASS}
    />
    <Link
      href={PATHS.ADMINISTRATION.EXTRAS_NEW}
      className={EXTRA_LIST_CREATE_LINK_CLASS}
    >
      {EXTRA_CATALOG_COPY.CREATE_CTA}
    </Link>
  </div>
);

export default ExtraListHeader;
