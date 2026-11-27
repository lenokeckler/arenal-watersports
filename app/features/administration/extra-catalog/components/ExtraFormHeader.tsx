import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  TitleVariant,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_TITLE } from "../constants/ExtraFormModeCopy.constants";
import type { ExtraFormHeaderProps } from "../models/ExtraFormHeaderProps.interface";
import {
  EXTRA_FORM_BACK_ICON_CLASS,
  EXTRA_FORM_BACK_LINK_CLASS,
  EXTRA_FORM_HEADER_CLASS,
  EXTRA_FORM_HEADING_CLASS,
  EXTRA_FORM_OVERLINE_CLASS,
  EXTRA_FORM_TITLE_CLASS,
} from "../styles/ExtraForm.styles";

const ExtraFormHeader = ({
  mode,
}: ExtraFormHeaderProps): React.JSX.Element => (
  <div className={EXTRA_FORM_HEADER_CLASS}>
    <Link
      href={PATHS.ADMINISTRATION.EXTRAS}
      className={EXTRA_FORM_BACK_LINK_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ARROW_BACK}
        className={EXTRA_FORM_BACK_ICON_CLASS}
      />
      <InlineText>
        {EXTRA_CATALOG_COPY.BACK_BUTTON}
      </InlineText>
    </Link>
    <div className={EXTRA_FORM_HEADING_CLASS}>
      <Text className={EXTRA_FORM_OVERLINE_CLASS}>
        {EXTRA_CATALOG_COPY.FORM_OVERLINE}
      </Text>
      <Title
        id={ADMINISTRATION_SCREEN_TITLE_ID}
        variant={TitleVariant.PRIMARY}
        text={EXTRA_FORM_TITLE[mode]}
        className={EXTRA_FORM_TITLE_CLASS}
      />
    </div>
  </div>
);

export default ExtraFormHeader;
