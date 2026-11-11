import SessionActivityTracker from "@/app/features/access/session-activity/SessionActivityTracker";
import SessionBar from "@/app/features/access/session-bar/SessionBar";
import SystemScreen from "@/app/features/access/system-screen/SystemScreen";
import SystemNavigation from "@/app/features/access/system-navigation/SystemNavigation";
import WorkModeSwitch from "@/app/features/access/work-mode/WorkModeSwitch";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";

const SystemLayout = async ({
  children,
}: LayoutProps<"/">): Promise<React.JSX.Element> => {
  const overview = await readWorkModeOverviewAsSignedIn();

  return (
    <SystemScreen overview={overview}>
      <SessionActivityTracker />
      <SessionBar />
      <WorkModeSwitch overview={overview} />
      {children}
      {overview?.current ? (
        <SystemNavigation overview={overview} />
      ) : null}
    </SystemScreen>
  );
};

export default SystemLayout;
