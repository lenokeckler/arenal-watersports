import { Text, Title } from "@/app/components";
import { FORM_GROUP_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { SCREEN_INSTRUCTION_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";
import { TitleVariant } from "@/app/components/title/constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_HEADING_CLASS } from "../styles/PasswordRecoveryForm.styles";

const PasswordRecoveryRequestHeading =
  (): React.JSX.Element => (
    <div className={FORM_GROUP_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={PASSWORD_RECOVERY_REQUEST_COPY.HEADING}
        className={PASSWORD_RECOVERY_HEADING_CLASS}
      />
      <Text className={SCREEN_INSTRUCTION_CLASS}>
        {PASSWORD_RECOVERY_REQUEST_COPY.INSTRUCTION}
      </Text>
    </div>
  );

export default PasswordRecoveryRequestHeading;
