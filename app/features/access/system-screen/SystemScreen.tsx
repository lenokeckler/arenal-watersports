import type { SystemScreenProps } from "./models/SystemScreenProps.interface";
import { SYSTEM_SCREEN_CLASS } from "./styles/SystemScreen.styles";

const SystemScreen = ({
  children,
}: SystemScreenProps): React.JSX.Element => (
  <div className={SYSTEM_SCREEN_CLASS}>{children}</div>
);

export default SystemScreen;
