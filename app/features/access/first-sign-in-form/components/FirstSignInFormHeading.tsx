import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { FIRST_SIGN_IN_FORM_COPY } from "../constants/FirstSignInFormCopy.constants";
import {
  FIRST_SIGN_IN_HEADING_BLOCK_CLASS,
  FIRST_SIGN_IN_HEADING_CLASS,
  FIRST_SIGN_IN_INSTRUCTION_CLASS,
} from "../styles/FirstSignInForm.styles";

const FirstSignInFormHeading = (): React.JSX.Element => (
  <div className={FIRST_SIGN_IN_HEADING_BLOCK_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={FIRST_SIGN_IN_FORM_COPY.HEADING}
      className={FIRST_SIGN_IN_HEADING_CLASS}
    />
    <Text className={FIRST_SIGN_IN_INSTRUCTION_CLASS}>
      {FIRST_SIGN_IN_FORM_COPY.INSTRUCTION}
    </Text>
  </div>
);

export default FirstSignInFormHeading;
