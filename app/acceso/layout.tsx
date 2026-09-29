import type { AccessLayoutProps } from "./models/AccessLayoutProps.interface";

const AccessLayout = ({
  children,
}: AccessLayoutProps): React.JSX.Element => (
  <main>{children}</main>
);

export default AccessLayout;
