import AccessScreenShell from "@/app/features/access/access-screen-shell/AccessScreenShell";
import { PROFILE_SCREEN_TITLE_ID } from "@/app/constants";

const ProfileLayout = ({
  children,
}: LayoutProps<"/profile">): React.JSX.Element => (
  <main>
    <AccessScreenShell titleId={PROFILE_SCREEN_TITLE_ID}>
      {children}
    </AccessScreenShell>
  </main>
);

export default ProfileLayout;
