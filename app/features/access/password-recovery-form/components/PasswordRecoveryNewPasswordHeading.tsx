import { Text, Title } from "@/app/components";
import { FORM_HINT_CLASS } from "@/app/components/form-layout/styles/FormLayout.styles";
import { SCREEN_SECTION_HEADING_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";
import { TitleVariant } from "@/app/components/title/constants";
import { PASSWORD_RECOVERY_NEW_PASSWORD_COPY } from "../constants/PasswordRecoveryNewPasswordCopy.constants";

const PasswordRecoveryNewPasswordHeading =
  (): React.JSX.Element => (
    <>
      <Title
        variant={TitleVariant.SECONDARY}
        text={PASSWORD_RECOVERY_NEW_PASSWORD_COPY.HEADING}
        className={SCREEN_SECTION_HEADING_CLASS}
      />
      <Text className={FORM_HINT_CLASS}>
        {PASSWORD_RECOVERY_NEW_PASSWORD_COPY.INTRO}
      </Text>
    </>
  );

export default PasswordRecoveryNewPasswordHeading;
