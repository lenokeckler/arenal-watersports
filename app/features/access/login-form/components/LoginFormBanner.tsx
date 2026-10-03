import { Text } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ALERT_ROLE } from "../constants/LoginFormAccessibility.constants";
import type { LoginFormBannerProps } from "../models/LoginFormBannerProps.interface";
import {
  LOGIN_FORM_BANNER_CLASS,
  LOGIN_FORM_BANNER_ICON_CLASS,
  LOGIN_FORM_BANNER_MESSAGE_CLASS,
} from "../styles/LoginForm.styles";

const LoginFormBanner = ({
  message,
}: LoginFormBannerProps): React.JSX.Element | null =>
  message ? (
    <div
      role={ALERT_ROLE}
      className={LOGIN_FORM_BANNER_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={LOGIN_FORM_BANNER_ICON_CLASS}
      />
      <Text className={LOGIN_FORM_BANNER_MESSAGE_CLASS}>
        {message}
      </Text>
    </div>
  ) : null;

export default LoginFormBanner;
