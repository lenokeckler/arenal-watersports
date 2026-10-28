import { Text } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { FormErrorBannerProps } from "./models/FormErrorBannerProps.interface";
import {
  FORM_ERROR_BANNER_CLASS,
  FORM_ERROR_BANNER_ICON_CLASS,
  FORM_ERROR_BANNER_MESSAGE_CLASS,
} from "./styles/FormErrorBanner.styles";

const FormErrorBanner = ({
  message,
}: FormErrorBannerProps): NullableRef<React.JSX.Element> =>
  message?.trim() ? (
    <div
      role={ARIA_ROLE.ALERT}
      className={FORM_ERROR_BANNER_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={FORM_ERROR_BANNER_ICON_CLASS}
      />
      <Text className={FORM_ERROR_BANNER_MESSAGE_CLASS}>
        {message}
      </Text>
    </div>
  ) : null;

export default FormErrorBanner;
