import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import type { ScreenHeadingProps } from "./models/ScreenHeadingProps.interface";
import {
  SCREEN_HEADING_ACTION_CLASS,
  SCREEN_HEADING_CLASS,
  SCREEN_HEADING_TITLE_CLASS,
} from "./styles/ScreenHeading.styles";
import type { JSX } from "react";

const ScreenHeading = ({
  action,
  id,
  title,
}: ScreenHeadingProps): JSX.Element => (
  <div className={SCREEN_HEADING_CLASS}>
    <Title
      id={id}
      variant={TitleVariant.PRIMARY}
      text={title}
      className={SCREEN_HEADING_TITLE_CLASS}
    />
    {action && (
      <Link
        href={action.href}
        className={SCREEN_HEADING_ACTION_CLASS}
      >
        <MaterialIcon name={MATERIAL_ICON_NAME.ADD} />
        <InlineText>{action.label}</InlineText>
      </Link>
    )}
  </div>
);

export default ScreenHeading;
