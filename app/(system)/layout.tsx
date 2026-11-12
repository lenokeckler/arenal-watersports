import SessionActivityTracker from "@/app/features/access/session-activity/SessionActivityTracker";
import { readOwnProfileIdentity } from "@/app/features/access/profile-hub/services/readOwnProfileIdentity";
import SessionControls from "@/app/features/access/session-bar/SessionControls";
import SessionBar from "@/app/features/access/session-bar/SessionBar";
import SystemScreen from "@/app/features/access/system-screen/SystemScreen";
import SystemNavigation from "@/app/features/access/system-navigation/SystemNavigation";
import WorkModeSwitch from "@/app/features/access/work-mode/WorkModeSwitch";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode";

const SystemLayout = async ({
  children,
}: LayoutProps<"/">): Promise<React.JSX.Element> => {
  const overview = await readWorkModeOverviewAsSignedIn();
  const identity = await readOwnProfileIdentity().catch(
    () => null
  );

  return (
    <SystemScreen overview={overview}>
      <SessionActivityTracker />
      {overview?.current ? null : <SessionBar />}
      <WorkModeSwitch overview={overview} />
      {children}
      {overview?.current ? (
        <SystemNavigation
          overview={overview}
          menuExtras={<SessionControls />}
          menuIdentity={identity}
        />
      ) : null}
    </SystemScreen>
  );
};

export default SystemLayout;
