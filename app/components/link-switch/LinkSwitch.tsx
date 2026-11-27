import Link from "@/app/components/link/Link";
import { ARIA_CURRENT } from "@/app/constants";
import type { LinkSwitchProps } from "./models/LinkSwitchProps.interface";
import {
  LINK_SWITCH_CLASS,
  resolveLinkSwitchOptionClass,
} from "./styles/LinkSwitch.styles";

const LinkSwitch = ({
  label,
  options,
}: LinkSwitchProps): React.JSX.Element => (
  <nav
    aria-label={label}
    className={LINK_SWITCH_CLASS}
  >
    {options.map((option) => (
      <Link
        key={option.key}
        href={option.href}
        ariaCurrent={
          option.isCurrent ? ARIA_CURRENT.PAGE : undefined
        }
        className={resolveLinkSwitchOptionClass(
          option.isCurrent
        )}
        replace
        scroll={false}
      >
        {option.label}
      </Link>
    ))}
  </nav>
);

export default LinkSwitch;
