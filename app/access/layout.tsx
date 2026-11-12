import AccessScreen from "@/app/features/access/access-screen-shell/AccessScreen";

const AccessLayout = ({
  children,
}: LayoutProps<"/access">): React.JSX.Element => (
  <AccessScreen>{children}</AccessScreen>
);

export default AccessLayout;
