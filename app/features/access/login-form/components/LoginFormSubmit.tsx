import { Button, InlineText } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import type { LoginFormSubmitProps } from "../models/LoginFormSubmitProps.interface";
import {
  resolveLoginFormSubmitClassName,
  resolveLoginFormSubmitIconClassName,
} from "../styles/LoginForm.styles";

const LoginFormSubmit = ({
  isPending,
}: LoginFormSubmitProps): React.JSX.Element => (
  <Button
    type="submit"
    variant={BUTTON.BASE}
    aria-disabled={isPending}
    className={resolveLoginFormSubmitClassName(isPending)}
  >
    <InlineText>
      {isPending
        ? LOGIN_FORM_COPY.SUBMITTING
        : LOGIN_FORM_COPY.SUBMIT}
    </InlineText>
    <MaterialIcon
      name={
        isPending
          ? MATERIAL_ICON_NAME.PROGRESS_ACTIVITY
          : MATERIAL_ICON_NAME.LOGIN
      }
      className={resolveLoginFormSubmitIconClassName(
        isPending
      )}
    />
  </Button>
);

export default LoginFormSubmit;
