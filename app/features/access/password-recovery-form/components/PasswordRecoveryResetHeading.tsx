import { Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "../constants/PasswordRecoveryResetCopy.constants";
import { SCREEN_SECTION_HEADING_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";

const PasswordRecoveryResetHeading =
  (): React.JSX.Element => (
    <Title
      variant={TitleVariant.SECONDARY}
      text={PASSWORD_RECOVERY_RESET_COPY.HEADING}
      className={SCREEN_SECTION_HEADING_CLASS}
    />
  );

export default PasswordRecoveryResetHeading;
