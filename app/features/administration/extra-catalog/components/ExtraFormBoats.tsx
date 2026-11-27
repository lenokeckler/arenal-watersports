import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Link from "@/app/components/link/Link";
import Title from "@/app/components/title/Title";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { TitleVariant } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraFormBoatsProps } from "../models/ExtraFormBoatsProps.type";
import {
  EXTRA_FORM_BOATS_LINK_CLASS,
  EXTRA_FORM_BOATS_LINK_CUE_CLASS,
  EXTRA_FORM_BOATS_LINK_TEXT_CLASS,
  EXTRA_FORM_GROUP_CLASS,
  EXTRA_FORM_GROUP_TITLE_CLASS,
  EXTRA_FORM_NOTE_CLASS,
  EXTRA_FORM_NOTE_ICON_CLASS,
} from "../styles/ExtraForm.styles";

const ExtraFormBoats = ({
  compatibilityHref,
}: ExtraFormBoatsProps): React.JSX.Element => (
  <div className={EXTRA_FORM_GROUP_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={EXTRA_CATALOG_COPY.BOATS_SECTION_TITLE}
      className={EXTRA_FORM_GROUP_TITLE_CLASS}
    />
    {compatibilityHref ? (
      <Link
        href={compatibilityHref}
        className={EXTRA_FORM_BOATS_LINK_CLASS}
      >
        <MaterialIcon
          name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
          className={EXTRA_FORM_NOTE_ICON_CLASS}
        />
        <InlineText
          className={EXTRA_FORM_BOATS_LINK_TEXT_CLASS}
        >
          {EXTRA_CATALOG_COPY.BOATS_EDIT_TEXT}
        </InlineText>
        <InlineText
          className={EXTRA_FORM_BOATS_LINK_CUE_CLASS}
        >
          {EXTRA_CATALOG_COPY.BOATS_CHANGE_LINK}
          <MaterialIcon
            name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
          />
        </InlineText>
      </Link>
    ) : (
      <div className={EXTRA_FORM_NOTE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.DIRECTIONS_BOAT}
          className={EXTRA_FORM_NOTE_ICON_CLASS}
        />
        <Text>{EXTRA_CATALOG_COPY.BOATS_CREATE_NOTE}</Text>
      </div>
    )}
  </div>
);

export default ExtraFormBoats;
