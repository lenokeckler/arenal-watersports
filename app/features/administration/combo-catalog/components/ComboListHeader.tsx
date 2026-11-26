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
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import {
  COMBO_LIST_CREATE_ICON_CLASS,
  COMBO_LIST_CREATE_LINK_CLASS,
  COMBO_LIST_HEADER_CLASS,
  COMBO_LIST_HEADING_CLASS,
  COMBO_LIST_SUBTITLE_CLASS,
  COMBO_LIST_TITLE_CLASS,
} from "../styles/ComboList.styles";

const ComboListHeader = (): React.JSX.Element => (
  <div className={COMBO_LIST_HEADER_CLASS}>
    <div className={COMBO_LIST_HEADING_CLASS}>
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={COMBO_CATALOG_COPY.LIST_TITLE}
        className={COMBO_LIST_TITLE_CLASS}
      />
      <Text className={COMBO_LIST_SUBTITLE_CLASS}>
        {COMBO_CATALOG_COPY.LIST_SUBTITLE}
      </Text>
    </div>
    <Link
      href={PATHS.ADMINISTRATION.COMBOS_NEW}
      className={COMBO_LIST_CREATE_LINK_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ADD}
        className={COMBO_LIST_CREATE_ICON_CLASS}
      />
      <InlineText>
        {COMBO_CATALOG_COPY.CREATE_CTA}
      </InlineText>
    </Link>
  </div>
);

export default ComboListHeader;
