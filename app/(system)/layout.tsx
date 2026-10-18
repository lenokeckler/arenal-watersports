import SessionBar from "@/app/features/access/session-bar/SessionBar";
import SystemScreen from "@/app/features/access/system-screen/SystemScreen";

const SystemLayout = ({
  children,
}: LayoutProps<"/">): React.JSX.Element => (
  <SystemScreen>
    <SessionBar />
    {children}
  </SystemScreen>
);

export default SystemLayout;
