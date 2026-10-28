import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { SCREEN_INSTRUCTION_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import {
  PASSWORD_CHANGE_HEADING_BLOCK_CLASS,
  PASSWORD_CHANGE_HEADING_CLASS,
} from "../styles/PasswordChangeForm.styles";

const FirstSignInFormHeading = (): React.JSX.Element => (
  <div className={PASSWORD_CHANGE_HEADING_BLOCK_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={FIRST_SIGN_IN_FORM_COPY.HEADING}
      className={PASSWORD_CHANGE_HEADING_CLASS}
    />
    <Text className={SCREEN_INSTRUCTION_CLASS}>
      {FIRST_SIGN_IN_FORM_COPY.INSTRUCTION}
    </Text>
  </div>
);

export default FirstSignInFormHeading;
