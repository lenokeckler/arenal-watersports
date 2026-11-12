import {
  InlineText,
  Link,
  MaterialIcon,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { ProfileEntryProps } from "./models/ProfileEntryProps.interface";
import ProfileEntryStatus from "./ProfileEntryStatus";
import {
  PROFILE_ENTRY_CHEVRON_CLASS,
  PROFILE_ENTRY_CLASS,
  PROFILE_ENTRY_ICON_CLASS,
  PROFILE_ENTRY_LABEL_CLASS,
} from "./styles/ProfileEntry.styles";

const ProfileEntryLink = ({
  entry,
}: ProfileEntryProps): React.JSX.Element => (
  <Link
    href={entry.href}
    className={PROFILE_ENTRY_CLASS}
  >
    <MaterialIcon
      name={entry.icon}
      className={PROFILE_ENTRY_ICON_CLASS}
    />
    <InlineText className={PROFILE_ENTRY_LABEL_CLASS}>
      {entry.label}
      <ProfileEntryStatus status={entry.status} />
    </InlineText>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
      className={PROFILE_ENTRY_CHEVRON_CLASS}
    />
  </Link>
);

export default ProfileEntryLink;
