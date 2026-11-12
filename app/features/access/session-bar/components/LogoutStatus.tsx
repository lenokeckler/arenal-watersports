import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import type { LogoutStatusProps } from "../models/LogoutStatusProps.interface";

const LogoutStatus = ({
  message,
}: LogoutStatusProps): React.JSX.Element => (
  <Text
    role={ARIA_ROLE.STATUS}
    className={SCREEN_READER_ONLY_CLASS}
  >
    {message}
  </Text>
);

export default LogoutStatus;
