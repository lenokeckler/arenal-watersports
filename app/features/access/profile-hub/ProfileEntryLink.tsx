import {
  InlineText,
  Link,
  MaterialIcon,
} from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { PATHS } from "@/app/constants";
import { PROFILE_COPY } from "./constants/ProfileCopy.constants";
import {
  PROFILE_ENTRY_CHEVRON_CLASS,
  PROFILE_ENTRY_CLASS,
  PROFILE_ENTRY_ICON_CLASS,
  PROFILE_ENTRY_LABEL_CLASS,
} from "./styles/ProfileEntry.styles";

const ProfileEntryLink = (): React.JSX.Element => (
  <Link
    href={PATHS.PROFILE.PASSWORD}
    className={PROFILE_ENTRY_CLASS}
  >
    <MaterialIcon
      name={MATERIAL_ICON_NAME.LOCK_RESET}
      className={PROFILE_ENTRY_ICON_CLASS}
    />
    <InlineText className={PROFILE_ENTRY_LABEL_CLASS}>
      {PROFILE_COPY.PASSWORD_ENTRY}
    </InlineText>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
      className={PROFILE_ENTRY_CHEVRON_CLASS}
    />
  </Link>
);

export default ProfileEntryLink;
