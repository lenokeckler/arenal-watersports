import AccessScreenShell from "@/app/features/access/access-screen-shell/AccessScreenShell";
import { PROFILE_SCREEN_TITLE_ID } from "@/app/constants";
import { PROFILE_MAIN_CLASS } from "@/app/styles/ProfileLayout.styles";

const ProfileLayout = ({
  children,
}: LayoutProps<"/profile">): React.JSX.Element => (
  <main className={PROFILE_MAIN_CLASS}>
    <AccessScreenShell
      titleId={PROFILE_SCREEN_TITLE_ID}
      isEmbedded
    >
      {children}
    </AccessScreenShell>
  </main>
);

export default ProfileLayout;
