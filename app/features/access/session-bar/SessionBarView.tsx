import FormErrorBanner from "@/app/components/form-error-banner/FormErrorBanner";
import LogoutButton from "./components/LogoutButton";
import LogoutStatus from "./components/LogoutStatus";
import type { SessionBarViewProps } from "./models/SessionBarViewProps.type";
import {
  SESSION_BAR_CLASS,
  SESSION_BAR_ROW_CLASS,
} from "./styles/SessionBar.styles";

const SessionBarView = ({
  phase,
  handlePress,
  errorMessage,
  pendingAnnouncement,
}: SessionBarViewProps): React.JSX.Element => (
  <header className={SESSION_BAR_CLASS}>
    <div className={SESSION_BAR_ROW_CLASS}>
      <LogoutStatus message={pendingAnnouncement} />
      <LogoutButton
        phase={phase}
        onPress={handlePress}
      />
    </div>
    <FormErrorBanner message={errorMessage} />
  </header>
);

export default SessionBarView;
