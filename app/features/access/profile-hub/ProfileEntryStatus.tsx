import { InlineText } from "@/app/components";
import type { ProfileEntryStatusProps } from "./models/ProfileEntryStatusProps.interface";
import { PROFILE_ENTRY_STATUS_CLASS } from "./styles/ProfileEntry.styles";

const ProfileEntryStatus = ({
  status,
}: ProfileEntryStatusProps): React.JSX.Element | null =>
  status ? (
    <InlineText className={PROFILE_ENTRY_STATUS_CLASS}>
      {status}
    </InlineText>
  ) : null;

export default ProfileEntryStatus;
