import Link from "@/app/components/link/Link";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import type { AlertStripProps } from "./models/AlertStripProps.interface";
import {
  ALERT_STRIP_ACTION_CLASS,
  ALERT_STRIP_BODY_CLASS,
  ALERT_STRIP_CLASS,
  ALERT_STRIP_DETAIL_CLASS,
  ALERT_STRIP_ICON_CLASS,
  ALERT_STRIP_TITLE_CLASS,
} from "./styles/AlertStrip.styles";
import type { JSX } from "react";

const AlertStrip = ({
  actionLabel,
  detail,
  href,
  replace,
  title,
}: AlertStripProps): JSX.Element => (
  <Link
    href={href}
    className={ALERT_STRIP_CLASS}
    replace={replace}
    scroll={replace ? false : undefined}
  >
    <MaterialIcon
      name={MATERIAL_ICON_NAME.WARNING}
      className={ALERT_STRIP_ICON_CLASS}
    />
    <InlineText className={ALERT_STRIP_BODY_CLASS}>
      <InlineText className={ALERT_STRIP_TITLE_CLASS}>
        {title}
      </InlineText>
      <InlineText className={ALERT_STRIP_DETAIL_CLASS}>
        {detail}
      </InlineText>
    </InlineText>
    <InlineText className={ALERT_STRIP_ACTION_CLASS}>
      {actionLabel}
      <MaterialIcon
        name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
      />
    </InlineText>
  </Link>
);

export default AlertStrip;
