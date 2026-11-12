import AccessScreenHeader from "./AccessScreenHeader";
import AccessScreenShell from "./AccessScreenShell";
import { ACCESS_SCREEN_TITLE_ID } from "./constants/AccessScreen.constants";
import type { AccessScreenProps } from "./models/AccessScreenProps.interface";

const AccessScreen = ({
  children,
}: AccessScreenProps): React.JSX.Element => (
  <main>
    <AccessScreenShell titleId={ACCESS_SCREEN_TITLE_ID}>
      <AccessScreenHeader />
      {children}
    </AccessScreenShell>
  </main>
);

export default AccessScreen;
