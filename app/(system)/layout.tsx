import SessionActivityTracker from "@/app/features/access/session-activity/SessionActivityTracker";
import SessionBar from "@/app/features/access/session-bar/SessionBar";
import SystemScreen from "@/app/features/access/system-screen/SystemScreen";
import WorkModeSwitch from "@/app/features/access/work-mode/WorkModeSwitch";

const SystemLayout = ({
  children,
}: LayoutProps<"/">): React.JSX.Element => (
  <SystemScreen>
    <SessionActivityTracker />
    <SessionBar />
    <WorkModeSwitch />
    {children}
  </SystemScreen>
);

export default SystemLayout;
