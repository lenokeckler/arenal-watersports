import SystemScreen from "@/app/features/access/system-screen/SystemScreen";

const SystemLayout = ({
  children,
}: LayoutProps<"/">): React.JSX.Element => (
  <SystemScreen>{children}</SystemScreen>
);

export default SystemLayout;
