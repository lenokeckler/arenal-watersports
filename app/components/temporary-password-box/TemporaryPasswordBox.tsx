"use client";

import {
  Button,
  InlineText,
  MaterialIcon,
  Text,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { FORM_HINT_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import {
  TEMPORARY_PASSWORD_BOX_COPY,
  TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT,
  TEMPORARY_PASSWORD_COPY_ICON,
  TEMPORARY_PASSWORD_COPY_LABEL,
} from "./constants/TemporaryPasswordBox.constants";
import { useTemporaryPasswordCopy } from "./hooks/useTemporaryPasswordCopy";
import type { TemporaryPasswordBoxProps } from "./models/TemporaryPasswordBoxProps.interface";
import {
  TEMPORARY_PASSWORD_BOX_CLASS,
  TEMPORARY_PASSWORD_COPY_BUTTON_CLASS,
  TEMPORARY_PASSWORD_COPY_ICON_CLASS,
  TEMPORARY_PASSWORD_LABEL_CLASS,
  TEMPORARY_PASSWORD_ROW_CLASS,
  TEMPORARY_PASSWORD_VALUE_CLASS,
} from "./styles/TemporaryPasswordBox.styles";

const TemporaryPasswordBox = ({
  temporaryPassword,
}: TemporaryPasswordBoxProps): React.JSX.Element => {
  const { copy, phase } = useTemporaryPasswordCopy(
    temporaryPassword
  );

  return (
    <div className={TEMPORARY_PASSWORD_BOX_CLASS}>
      <Text className={TEMPORARY_PASSWORD_LABEL_CLASS}>
        {TEMPORARY_PASSWORD_BOX_COPY.LABEL}
      </Text>
      <div className={TEMPORARY_PASSWORD_ROW_CLASS}>
        <Text
          className={TEMPORARY_PASSWORD_VALUE_CLASS}
          translate="no"
        >
          {temporaryPassword}
        </Text>
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          className={TEMPORARY_PASSWORD_COPY_BUTTON_CLASS}
          onClick={() => {
            void copy();
          }}
        >
          <MaterialIcon
            name={TEMPORARY_PASSWORD_COPY_ICON[phase]}
            className={TEMPORARY_PASSWORD_COPY_ICON_CLASS}
          />
          <InlineText>
            {TEMPORARY_PASSWORD_COPY_LABEL[phase]}
          </InlineText>
        </Button>
      </div>
      <Text
        role={ARIA_ROLE.STATUS}
        className={FORM_HINT_CLASS}
      >
        {TEMPORARY_PASSWORD_COPY_ANNOUNCEMENT[phase]}
      </Text>
      <Text className={FORM_HINT_CLASS}>
        {TEMPORARY_PASSWORD_BOX_COPY.HINT}
      </Text>
    </div>
  );
};

export default TemporaryPasswordBox;
