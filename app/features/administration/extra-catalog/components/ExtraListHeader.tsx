import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import {
  EXTRA_LIST_CREATE_ICON_CLASS,
  EXTRA_LIST_CREATE_LINK_CLASS,
  EXTRA_LIST_HEADER_CLASS,
  EXTRA_LIST_HEADER_TITLE_CLASS,
  EXTRA_LIST_HEADING_CLASS,
  EXTRA_LIST_SUBTITLE_CLASS,
} from "../styles/ExtraList.styles";

const ExtraListHeader = (): React.JSX.Element => (
  <div className={EXTRA_LIST_HEADER_CLASS}>
    <div className={EXTRA_LIST_HEADING_CLASS}>
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={EXTRA_CATALOG_COPY.LIST_TITLE}
        className={EXTRA_LIST_HEADER_TITLE_CLASS}
      />
      <Text className={EXTRA_LIST_SUBTITLE_CLASS}>
        {EXTRA_CATALOG_COPY.LIST_SUBTITLE}
      </Text>
    </div>
    <Link
      href={PATHS.ADMINISTRATION.EXTRAS_NEW}
      className={EXTRA_LIST_CREATE_LINK_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ADD}
        className={EXTRA_LIST_CREATE_ICON_CLASS}
      />
      <InlineText>
        {EXTRA_CATALOG_COPY.CREATE_CTA}
      </InlineText>
    </Link>
  </div>
);

export default ExtraListHeader;
