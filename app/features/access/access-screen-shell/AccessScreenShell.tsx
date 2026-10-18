import { Section } from "@/app/components";
import { ACCESS_SHELL_BACKDROP_TEST_ID } from "./constants/AccessScreenShell.constants";
import { ACCESS_SHELL_DEFAULTS } from "./constants/AccessScreenShellDefaults.constants";
import type { AccessScreenShellProps } from "./models/AccessScreenShellProps.interface";
import {
  ACCESS_SHELL_BACKDROP_CLASS,
  ACCESS_SHELL_BLOB_PRIMARY_CLASS,
  ACCESS_SHELL_BLOB_TERTIARY_CLASS,
  ACCESS_SHELL_CARD_CLASS,
  resolveAccessShellContentClassName,
  resolveAccessShellPageClassName,
} from "./styles/AccessScreenShell.styles";

const AccessScreenShell = ({
  titleId,
  children,
  isEmbedded = ACCESS_SHELL_DEFAULTS.isEmbedded,
}: AccessScreenShellProps): React.JSX.Element => (
  <div
    className={resolveAccessShellPageClassName(isEmbedded)}
  >
    <div
      aria-hidden="true"
      data-testid={ACCESS_SHELL_BACKDROP_TEST_ID}
      className={ACCESS_SHELL_BACKDROP_CLASS}
    >
      <div className={ACCESS_SHELL_BLOB_PRIMARY_CLASS} />
      <div className={ACCESS_SHELL_BLOB_TERTIARY_CLASS} />
    </div>
    <div
      className={resolveAccessShellContentClassName(
        isEmbedded
      )}
    >
      <Section
        ariaLabel={titleId}
        className={ACCESS_SHELL_CARD_CLASS}
      >
        {children}
      </Section>
    </div>
  </div>
);

export default AccessScreenShell;
