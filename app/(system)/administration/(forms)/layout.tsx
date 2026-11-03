import AccessScreenShell from "@/app/features/access/access-screen-shell/AccessScreenShell";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { ADMINISTRATION_MAIN_CLASS } from "@/app/styles/AdministrationLayout.styles";

const AdministrationLayout = ({
  children,
}: LayoutProps<"/administration">): React.JSX.Element => (
  <main className={ADMINISTRATION_MAIN_CLASS}>
    <AccessScreenShell
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      isEmbedded
    >
      {children}
    </AccessScreenShell>
  </main>
);

export default AdministrationLayout;
