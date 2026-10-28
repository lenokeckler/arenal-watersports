import SessionActivityTracker from "@/app/features/access/session-activity/SessionActivityTracker";
import SessionBar from "@/app/features/access/session-bar/SessionBar";
import SystemScreen from "@/app/features/access/system-screen/SystemScreen";

const SystemLayout = ({
  children,
}: LayoutProps<"/">): React.JSX.Element => (
  <SystemScreen>
    <SessionActivityTracker />
    <SessionBar />
    {children}
  </SystemScreen>
);

export default SystemLayout;
