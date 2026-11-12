import type { ProfileEntryListProps } from "./models/ProfileEntryListProps.interface";
import ProfileEntryLink from "./ProfileEntryLink";
import { PROFILE_ENTRY_LIST_CLASS } from "./styles/ProfileEntry.styles";

const ProfileEntryList = ({
  entries,
}: ProfileEntryListProps): React.JSX.Element => (
  <ul className={PROFILE_ENTRY_LIST_CLASS}>
    {entries.map((entry) => (
      <li key={entry.id}>
        <ProfileEntryLink entry={entry} />
      </li>
    ))}
  </ul>
);

export default ProfileEntryList;
