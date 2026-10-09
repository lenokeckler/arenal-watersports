import { Text } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { FormSuccessNoticeProps } from "./models/FormSuccessNoticeProps.interface";
import {
  FORM_SUCCESS_NOTICE_CLASS,
  FORM_SUCCESS_NOTICE_ICON_CLASS,
  FORM_SUCCESS_NOTICE_MESSAGE_CLASS,
} from "./styles/FormSuccessNotice.styles";

const FormSuccessNotice = ({
  message,
}: FormSuccessNoticeProps): NullableRef<React.JSX.Element> =>
  message ? (
    <div
      role={ARIA_ROLE.STATUS}
      className={FORM_SUCCESS_NOTICE_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.CHECK_CIRCLE}
        className={FORM_SUCCESS_NOTICE_ICON_CLASS}
      />
      <Text className={FORM_SUCCESS_NOTICE_MESSAGE_CLASS}>
        {message}
      </Text>
    </div>
  ) : null;

export default FormSuccessNotice;
