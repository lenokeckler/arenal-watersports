import AccessScreenShell from "@/app/features/access/access-screen-shell/AccessScreenShell";
import { WORK_MODE_SCREEN_TITLE_ID } from "@/app/constants";
import { WORK_MODE_MAIN_CLASS } from "@/app/styles/WorkModeLayout.styles";

const WorkModeLayout = ({
  children,
}: LayoutProps<"/mode">): React.JSX.Element => (
  <main className={WORK_MODE_MAIN_CLASS}>
    <AccessScreenShell
      titleId={WORK_MODE_SCREEN_TITLE_ID}
      isEmbedded
    >
      {children}
    </AccessScreenShell>
  </main>
);

export default WorkModeLayout;
