import FormSubmitButton from "@/app/components/form-submit-button/FormSubmitButton";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import type { LoginFormSubmitProps } from "../models/LoginFormSubmitProps.interface";

const LoginFormSubmit = ({
  isPending,
}: LoginFormSubmitProps): React.JSX.Element => (
  <FormSubmitButton
    icon={MATERIAL_ICON_NAME.LOGIN}
    isPending={isPending}
    label={LOGIN_FORM_COPY.SUBMIT}
    pendingLabel={LOGIN_FORM_COPY.SUBMITTING}
  />
);

export default LoginFormSubmit;
